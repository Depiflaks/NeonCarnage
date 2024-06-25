import { player } from "../settings.js";

class Player {
    constructor(x0, y0, skin, ctx) {
        this.x0 = x0;
        this.y0 = y0;
        this.x = this.x0;
        this.y = this.y0;
        this.alpha = 2;
        this.ctx = ctx;
        addEventListener("mousemove", (event) => {this.mouseMove(event)})
    }

    draw() {
        this.ctx.strokeStyle = player.bodyColor;
        this.ctx.lineWidth = player.h;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x - player.w * Math.cos(this.alpha) / 2, this.y - player.w * Math.sin(this.alpha) / 2);
        this.ctx.lineTo(this.x + player.w * Math.cos(this.alpha) / 2, this.y + player.w * Math.sin(this.alpha) / 2);
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = player.headColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, player.radius, 0, Math.PI * 2, true);
        this.ctx.fill();
    }

    drawViewLine() {

    }

    mouseMove(event) {
        this.alpha 
    }
}




export { Player }