import { PLAYER_SET } from "../settings.js";

class Player {
    constructor(x0, y0, skin, ctx) {
        this.x0 = x0;
        this.y0 = y0;
        this.x = this.x0;
        this.y = this.y0;
        this.alpha = 0;
        this.ctx = ctx;
        this.speedX = 0;
        this.speedY = 0;
        this.keyPressed = {
            w: 0,
            a: 0,
            s: 0,
            d: 0,
        }

        addEventListener("mousemove", (event) => {this.mouseMove(event)});
        addEventListener("keydown", (event) => {this.keyDown(event)});
        addEventListener("keyup", (event) => {this.keyUp(event)});
    }

    draw() {
        this.ctx.strokeStyle = PLAYER_SET.bodyColor;
        this.ctx.lineWidth = PLAYER_SET.h;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x - PLAYER_SET.w * Math.cos(this.alpha + Math.PI / 2) / 2, this.y - PLAYER_SET.w * Math.sin(this.alpha + Math.PI / 2) / 2);
        this.ctx.lineTo(this.x + PLAYER_SET.w * Math.cos(this.alpha + Math.PI / 2) / 2, this.y + PLAYER_SET.w * Math.sin(this.alpha + Math.PI / 2) / 2);
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = PLAYER_SET.headColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, PLAYER_SET.radius, 0, Math.PI * 2, true);
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
        this.move(this.speedX, this.speedY);
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

    key() {

        if((this.keyPressed.w) && (this.keyPressed.d)){
            this.speedY = -PLAYER_SET.speed * PLAYER_SET.pythagoreanFactor;
            this.speedX = PLAYER_SET.speed * PLAYER_SET.pythagoreanFactor;
        }

        if((this.keyPressed.d) && (this.keyPressed.s)){
            this.speedY = PLAYER_SET.speed * PLAYER_SET.pythagoreanFactor;
            this.speedX = PLAYER_SET.speed * PLAYER_SET.pythagoreanFactor;
        }

        if((this.keyPressed.s) && (this.keyPressed.a)){
            this.speedY = PLAYER_SET.speed * PLAYER_SET.pythagoreanFactor;
            this.speedX = -PLAYER_SET.speed * PLAYER_SET.pythagoreanFactor;
        }

        if((this.keyPressed.w) && (this.keyPressed.a)){
            this.speedY = -PLAYER_SET.speed * PLAYER_SET.pythagoreanFactor;
            this.speedX = -PLAYER_SET.speed * PLAYER_SET.pythagoreanFactor;
        }

        if(this.keyPressed.w) {
            this.speedY = -PLAYER_SET.speed;
        }

        if(this.keyPressed.a) {
            this.speedX = -PLAYER_SET.speed;
        }

        if(this.keyPressed.s) {
            this.speedY = PLAYER_SET.speed;
        }

        if(this.keyPressed.d) {
            this.speedX = PLAYER_SET.speed;
        }

        if((!this.keyPressed.w) && (!this.keyPressed.s)){
            this.speedY = 0;
        }

        if((!this.keyPressed.a) && (!this.keyPressed.d)){
            this.speedX = 0;
        }
    }

    keyDown(event) {
        switch(event.code) {
            case 'KeyW': 
                this.keyPressed.w = 1;
                break;
            case 'KeyA': 
                this.keyPressed.a = 1;
                break;
            case 'KeyS': 
                this.keyPressed.s = 1;
                break;
            case 'KeyD': 
                this.keyPressed.d = 1;
                break;
        }
        this.key();
    }

    keyUp(event) {
        switch(event.code) {
            case 'KeyW': 
                this.keyPressed.w = 0;
                break;
            case 'KeyA': 
                this.keyPressed.a = 0;
                break;
            case 'KeyS': 
                this.keyPressed.s = 0;
                break;
            case 'KeyD': 
                this.keyPressed.d = 0;
                break;
        }
        this.key();
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}




export { Player }