import { PLAYER } from "../CONST.js";

class PlayerView {
    constructor(context) {
        this.context = context;
    }

    draw({x, y}, angle) {
        this.context.strokeStyle = PLAYER.bodyColor;
        this.context.lineWidth = PLAYER.h;
        this.context.beginPath();
        this.context.moveTo(
            x - PLAYER.w * Math.cos(angle + Math.PI / 2) / 2,
            y - PLAYER.w * Math.sin(angle + Math.PI / 2) / 2
        );
        this.context.lineTo(
            x + PLAYER.w * Math.cos(angle + Math.PI / 2) / 2,
            y + PLAYER.w * Math.sin(angle + Math.PI / 2) / 2
        );
        this.context.stroke();

        this.context.lineWidth = 1;
        this.context.fillStyle = PLAYER.headColor;
        this.context.beginPath();
        this.context.arc(x, y, PLAYER.radius, 0, Math.PI * 2, true);
        this.context.fill();

        //this.drawViewLine(x, y, angle);
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
