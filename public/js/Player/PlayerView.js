import { PLAYER_SET } from "../settings.js";

class PlayerView {
    constructor(ctx) {
        this.ctx = ctx;
    }

<<<<<<< Updated upstream
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
=======
    draw({ x, y }, angle) {
        this.context.strokeStyle = PLAYER_SET.bodyColor;
        this.context.lineWidth = PLAYER_SET.h;
        this.context.beginPath();
        this.context.moveTo(
            x - PLAYER_SET.w * Math.cos(angle + Math.PI / 2) / 2,
            y - PLAYER_SET.w * Math.sin(angle + Math.PI / 2) / 2
        );
        this.context.lineTo(
            x + PLAYER_SET.w * Math.cos(angle + Math.PI / 2) / 2,
            y + PLAYER_SET.w * Math.sin(angle + Math.PI / 2) / 2
>>>>>>> Stashed changes
        );
        this.ctx.stroke();

        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = PLAYER_SET.headColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, PLAYER_SET.radius, 0, Math.PI * 2, true);
        this.ctx.fill();

        this.drawViewLine(x, y, angle);
    }

<<<<<<< Updated upstream
    drawViewLine(x, y, alpha) {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "red";
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + 300 * Math.cos(alpha), y + 300 * Math.sin(alpha));
        this.ctx.stroke();
=======
    drawViewLine(x, y, angle) {
        this.context.lineWidth = 2;
        this.context.strokeStyle = "red";
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x + 300 * Math.cos(angle), y + 300 * Math.sin(angle));
        this.context.stroke();
>>>>>>> Stashed changes
    }
}

export { PlayerView };
