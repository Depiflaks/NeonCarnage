import { Cell } from "../BattleGround/Cell.js";
import { PlayerView } from "../Player/PlayerView.js";
import { WINDOW, RAD, PLAYER_SET, CELL_SET } from "../settings.js";


class GameView {
    constructor(canvas) {
        this.canvas = canvas
        canvas.width = WINDOW.w;
        canvas.height = WINDOW.h;
        this.context = canvas.getContext("2d");
    }

    drawFrame(field, player) {
        field.drawGround(this.context);
        field.drawWeapons(player.model, this.context);
        player.view.draw(
            player.model.getPosition(), 
            player.model.getAngle()
        );
        field.drawWalls(this.context);
    }

    updateFrame(field, player) {
        field.clearFrame(this.context);
        this.drawFrame(field, player);
        field.hideCells();
        this.drawViewingRange(player, field)
        
    }

    drawLine(x1, y1, x2, y2) {
        this.context.lineWidth = 1;
        this.context.strokeStyle = "red";
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        //console.log(123, x1, y1, x2, y2)
    }

    drawCircle(x, y, radius) {
        this.context.fillStyle = "red";
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2, true);
        this.context.fill();
    }

    drawViewingRange(player, field) {
        let { x: px, y: py } = player.model.getPosition();
        px -= field.x;
        py -= field.y;
        //console.log(px, py);
        for (let angle = 0 * RAD; angle <= 360 * RAD; angle += PLAYER_SET.visualField.angleStep) {
            const tg = Math.tan(angle);

            const directionX = Math.cos(angle) > 0;
            const startX = Math.floor(px / CELL_SET.w + directionX) * CELL_SET.w;
            const stepX = CELL_SET.w * (directionX ? 1 : -1);
            let rayY = (startX - px) * tg + py, indexY;

            const directionY = Math.sin(angle) < 0;
            const startY = Math.floor(py / CELL_SET.h + directionY) * CELL_SET.h;
            const stepY = CELL_SET.h * (directionY ? 1 : -1);
            let rayX, indexX;
    
            for (let rayX = startX; (rayX - px) ** 2 + ((rayX - px) * tg) ** 2 <= PLAYER_SET.visualField.range ** 2; rayX += stepX) {
                rayY = (rayX - px) * tg + py;
                indexX = Math.floor(rayX / CELL_SET.w);
                indexY = Math.floor(rayY / CELL_SET.h);
                if (!(0 <= indexX && indexX <= field.w && 0 <= indexY && indexY <= field.h)) break;
                if (!field.cells[indexX][indexY]) break;
                field.cells[indexX][indexY].active = true;
                if (!(0 <= indexX - 1)) break;
                if (!field.cells[indexX - 1][indexY]) break;
                field.cells[indexX - 1][indexY].active = true;
                //this.drawCircle(rayX + field.x, rayY + field.y, 5);
            }
            
            for (let rayY = startY; ((rayY - py) / tg) ** 2 + (rayY - py) ** 2 <= PLAYER_SET.visualField.range ** 2; rayY += stepY) {
                rayX = (rayY - py) / tg + px;
                indexX = Math.floor(rayX / CELL_SET.w);
                indexY = Math.floor(rayY / CELL_SET.h);
                if (!(0 <= indexX && indexX <= field.w && 0 <= indexY && indexY <= field.h)) break;
                if (!field.cells[indexX][indexY]) break;
                field.cells[indexX][indexY].active = true;
                if (!(0 <= indexY - 1)) break;
                if (!field.cells[indexX][indexY - 1]) break;
                field.cells[indexX][indexY - 1].active = true;
                //this.drawCircle(rayX + field.x, rayY + field.y, 5);
            }
        }
    }
}


export { GameView };