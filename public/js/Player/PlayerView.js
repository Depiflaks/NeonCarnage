import { PLAYER_SET } from "../settings.js";

class PlayerView {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(playerModel) {
        const { x, y } = playerModel.getPosition();
        const alpha = playerModel.getAlpha();

        this.ctx.strokeStyle = PLAYER_SET.bodyColor;
        this.ctx.lineWidth = PLAYER_SET.h;
        this.ctx.beginPath();
        this.ctx.moveTo(
            x - PLAYER_SET.w * Math.cos(alpha + Math.PI / 2) / 2,
            y - PLAYER_SET.w * Math.sin(alpha + Math.PI / 2) / 2
        );
        this.ctx.lineTo(
            x + PLAYER_SET.w * Math.cos(alpha + Math.PI / 2) / 2,
            y + PLAYER_SET.w * Math.sin(alpha + Math.PI / 2) / 2
        );
        this.ctx.stroke();

        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = PLAYER_SET.headColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, PLAYER_SET.radius, 0, Math.PI * 2, true);
        this.ctx.fill();

        this.drawViewLine(x, y, alpha);
    }

    drawViewLine(x, y, alpha) {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "red";
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + 300 * Math.cos(alpha), y + 300 * Math.sin(alpha));
        this.ctx.stroke();
    }
}

export { PlayerView };
