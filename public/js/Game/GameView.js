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
        field.drawWeapons(player, this.context);
        player.view.draw(
            player.model.getPosition(), 
            player.model.getAngle()
        );
        field.drawWalls(this.context);
    }

    updateFrame(field, player) {
        field.clearFrame(this.context);
        this.drawFrame(field, player);
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
            let rayY;
    
            //this.drawLine(px, py, px + PLAYER_SET.visualField.range * Math.cos(angle), py + PLAYER_SET.visualField.range * Math.sin(angle));
            for (let rayX = startX; true; rayX += stepX) {
                rayY = (rayX - px) * tg + py;
                this.drawCircle(rayX + field.x, rayY + field.y, 5);

                if (directionX) {
                    if (rayX >= px + PLAYER_SET.visualField.range * Math.cos(angle)) break;
                } else {
                    if (rayX <= py + PLAYER_SET.visualField.range * Math.cos(angle)) break;
                }
            }
            //console.log(Math.sin(angle));
            const directionY = Math.sin(angle) < 0;
            const startY = Math.floor(py / CELL_SET.h + directionY) * CELL_SET.h;
            const stepY = CELL_SET.h * (directionY ? 1 : -1);
            let rayX;

            for (let rayY = startY; true; rayY += stepY) {
                //console.log(rayY, stepY, startY);
                //console.log(directionY)
                rayX = (rayY - py) / tg + px;
                this.drawCircle(rayX + field.x, rayY + field.y, 5);
                if (directionY) {
                    if (rayY >= py - PLAYER_SET.visualField.range * Math.sin(angle)) break;
                } else {
                    if (rayY <= py - PLAYER_SET.visualField.range * Math.sin(angle)) break;
                }
            }
        }
    }
}


export { GameView };