import { playerSet } from "../settings.js";

class Player {
    constructor(x0, y0, skin, ctx) {
        this.x0 = x0;
        this.y0 = y0;
        this.x = this.x0;
        this.y = this.y0;
        this.alpha = 0;
        this.ctx = ctx;
        addEventListener("mousemove", (event) => {this.mouseMove(event)});
        addEventListener("keydown", (event) => {this.keyDown(event)});
    }

    draw() {
        this.ctx.strokeStyle = playerSet.bodyColor;
        this.ctx.lineWidth = playerSet.h;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x - playerSet.w * Math.cos(this.alpha + Math.PI / 2) / 2, this.y - playerSet.w * Math.sin(this.alpha + Math.PI / 2) / 2);
        this.ctx.lineTo(this.x + playerSet.w * Math.cos(this.alpha + Math.PI / 2) / 2, this.y + playerSet.w * Math.sin(this.alpha + Math.PI / 2) / 2);
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = playerSet.headColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, playerSet.radius, 0, Math.PI * 2, true);
        this.ctx.fill();
        this.drawViewLine();
    }

    drawViewLine() {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "red";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + 300 * Math.cos(this.alpha), this.y + 300 * Math.sin(this.alpha));
        this.ctx.stroke();
    }

    update() {

    }

    mouseMove(event) {
        const v1 = {
            x: 1,
            y: 0
        };
        const v2 = {
            x: event.x - this.x,
            y: event.y - this.y
        };
        const difference = { x: v2.x - v1.x, y: v2.y - v1.y };
        this.alpha = Math.atan2(difference.x, -difference.y); 
        this.alpha -= Math.PI / 2;
    }

    keyDown(event) {

    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}




export { Player }