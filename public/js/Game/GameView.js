import { Cell } from "../BattleGround/Cell.js";
import { PlayerView } from "../Player/PlayerView.js";
import { WINDOW, RAD, PLAYER, CELL } from "../CONST.js";


class GameView {
    constructor(canvas) {
        this.canvas = canvas
        canvas.width = WINDOW.w;
        canvas.height = WINDOW.h;
        this.context = canvas.getContext("2d");
        this.playerView = new PlayerView(this.context);
    }

    drawFrame(field, player) {
        field.drawGround(this.context);
        field.drawWeapons(player.getPosition(), player.getAngle(), this.context);
        this.playerView.draw(
            player.getPosition(),
            player.getAngle()
        );
        if (player.getTrajectory()) player.getTrajectory().draw(this.context)
        // players.forEach(player => {
        //     player.player.view.draw(
        //         player.player.getPosition(), 
        //         player.player.getAngle()
        //     );
        // });
        this.drawBullets(player.getBullets(), field);
        field.drawWalls(this.context);
        this.drawBulletAmount(player);
    }

    drawBullets(bullets, field) {
        let indexX, indexY;
        bullets.map(bullet => {
            indexX = Math.floor((bullet.x + bullet.h * Math.cos(bullet.angle) - field.x) / CELL.w);
            indexY = Math.floor((bullet.y + bullet.h * Math.sin(bullet.angle) - field.y) / CELL.h);
            if (indexX >= 0 && indexX <= field.w && indexY >= 0 && indexY <= field.h && field.cells[indexX][indexY].active) bullet.draw(this.context);
        });
    }

    drawBulletAmount(player) {
        if((player.getWeapon() != null) && (player.getWeapon().getBattleType() == "distant")) {
            this.context.font = "48px roboto";
            this.context.fillText(player.getWeapon().getAmount(), 10, 50);
        }
    }

    updateFrame(field, player, players) {
        field.clearFrame(this.context);
        this.drawFrame(field, player, players);
    }

    drawLine(x1, y1, x2, y2, color, field) {
        this.context.lineWidth = 1;
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(x1 + field.x, y1 + field.y);
        this.context.lineTo(x2 + field.x, y2 + field.y);
        this.context.stroke();
    }

    drawCircle(x, y, radius, color, field) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x + field.x, y + field.y, radius, 0, Math.PI * 2, true);
        this.context.fill();
    }

    strokeCircle(x, y, radius, color, field) {
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.arc(x + field.x, y + field.y, radius, 0, Math.PI * 2, true);
        this.context.stroke();
    }
}


export { GameView };