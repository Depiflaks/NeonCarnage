import { PLAYER_SET } from "../settings.js";

class PlayerView {
    constructor(context) {
        this.context = context;
    }

    draw(playerModel) {
        const { x, y } = playerModel.getPosition();
        const angle = playerModel.getAngle();

        this.ctx.strokeStyle = PLAYER_SET.bodyColor;
        this.ctx.lineWidth = PLAYER_SET.h;
        this.ctx.beginPath();
        this.ctx.moveTo(
            x - PLAYER_SET.w * Math.cos(angle + Math.PI / 2) / 2,
            y - PLAYER_SET.w * Math.sin(angle + Math.PI / 2) / 2
        );
        this.ctx.lineTo(
            x + PLAYER_SET.w * Math.cos(angle + Math.PI / 2) / 2,
            y + PLAYER_SET.w * Math.sin(angle + Math.PI / 2) / 2
        );
        this.context.stroke();

        this.context.lineWidth = 1;
        this.context.fillStyle = PLAYER_SET.headColor;
        this.context.beginPath();
        this.context.arc(x, y, PLAYER_SET.radius, 0, Math.PI * 2, true);
        this.context.fill();

        this.drawViewLine(x, y, angle);
    }

    drawViewLine(x, y, angle) {
        this.context.lineWidth = 2;
        this.context.strokeStyle = "red";
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x + 300 * Math.cos(angle), y + 300 * Math.sin(angle));
        this.context.stroke();
    }
}

export { PlayerView };
