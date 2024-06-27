import { PlayerView } from "../Player/PlayerView.js";
import { WINDOW, RAD, PLAYER_SET } from "../settings.js";


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
    }

    drawCircle(x, y, radius) {
        this.context.fillStyle = "red";
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2, true);
        this.context.fill();
    }

    drawViewingRange(player, field) {
        const { x, y } = player.model.getPosition();
        for (let angle = 0; angle <= 360 * RAD; angle += PLAYER_SET.visualField.angleStep) {
            this.drawLine(x, y, x + PLAYER_SET.visualField.range * Math.cos(angle), y + PLAYER_SET.visualField.range * Math.sin(angle));
        }
    }
}


export { GameView };