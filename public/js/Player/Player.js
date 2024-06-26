import { PLAYER_SET } from "../settings.js";
import { Moveable } from "../components/Moveable.js";

class Player extends Moveable {
    constructor(x, y, ctx) {
        super(x, y, PLAYER_SET.w, PLAYER_SET.h, PLAYER_SET.radius);
        this.ctx = ctx;
        this.keyPressed = {
            w: 0,
            a: 0,
            s: 0,
            d: 0,
        };

        addEventListener("mousemove", (event) => {this.mouseMove(event)});
        addEventListener("keydown", (event) => {this.keyDown(event)});
        addEventListener("keyup", (event) => {this.keyUp(event)});
    }

    draw() {
        this.ctx.strokeStyle = PLAYER_SET.bodyColor;
        this.ctx.lineWidth = this.h;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x - this.w * Math.cos(this.alpha + Math.PI / 2) / 2, this.y - this.w * Math.sin(this.alpha + Math.PI / 2) / 2);
        this.ctx.lineTo(this.x + this.w * Math.cos(this.alpha + Math.PI / 2) / 2, this.y + this.w * Math.sin(this.alpha + Math.PI / 2) / 2);
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = PLAYER_SET.headColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
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

        if((this.keyPressed.w) && (this.keyPressed.d)){
            this.speedY *= PLAYER_SET.pythagoreanFactor;
            this.speedX *= PLAYER_SET.pythagoreanFactor;
            return;
        }

        if((this.keyPressed.d) && (this.keyPressed.s)){
            this.speedY *= PLAYER_SET.pythagoreanFactor;
            this.speedX *= PLAYER_SET.pythagoreanFactor;
            return;
        }

        if((this.keyPressed.s) && (this.keyPressed.a)){
            this.speedY *= PLAYER_SET.pythagoreanFactor;
            this.speedX *= PLAYER_SET.pythagoreanFactor;
            return;
        }

        if((this.keyPressed.w) && (this.keyPressed.a)){
            this.speedY *= PLAYER_SET.pythagoreanFactor;
            this.speedX *= PLAYER_SET.pythagoreanFactor;
            return;
        }

        if((!this.keyPressed.w) && (!this.keyPressed.s)){
            this.speedY = 0;
        }

        if((!this.keyPressed.a) && (!this.keyPressed.d)){
            this.speedX = 0;
        }
    }

    changePressed(code, state) {
        switch(code) {
            case 'KeyW': 
                this.keyPressed.w = state;
                break;
            case 'KeyA': 
                this.keyPressed.a = state;
                break;
            case 'KeyS': 
                this.keyPressed.s = state;
                break;
            case 'KeyD': 
                this.keyPressed.d = state;
                break;
        }
    }

    keyDown(event) {
        this.changePressed(event.code, 1);
        this.key();
    }

    keyUp(event) {
        this.changePressed(event.code, 0);
        this.key();
    }
}




export { Player }