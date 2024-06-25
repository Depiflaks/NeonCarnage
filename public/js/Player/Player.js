import { player } from "../settings.js";

class Player {
    constructor(x0, y0, skin, ctx) {
        this.x0 = x0;
        this.y0 = y0;
        this.x = this.x0;
        this.y = this.y0;
        this.alpha = 0;
        this.ctx = ctx;
        addEventListener("mousemove", (event) => {this.mouseMove(event)})
    }

    draw() {
        this.ctx.strokeStyle = player.bodyColor;
        this.ctx.lineWidth = player.h;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x - player.w * Math.cos(this.alpha + 1.57) / 2, this.y - player.w * Math.sin(this.alpha + 1.57) / 2);
        this.ctx.lineTo(this.x + player.w * Math.cos(this.alpha + 1.57) / 2, this.y + player.w * Math.sin(this.alpha + 1.57) / 2);
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = player.headColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, player.radius, 0, Math.PI * 2, true);
        this.ctx.fill();
        this.drawViewLine();
    }

    drawViewLine() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "red";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + 300 * Math.cos(this.alpha), this.y + 300 * Math.sin(this.alpha));
        this.ctx.stroke();
        //console.log(this.alpha);
    }

    mouseMove(event) {
        this.alpha = Math.atan((event.y - this.y) / (event.x - this.x));
    }
}




export { Player }