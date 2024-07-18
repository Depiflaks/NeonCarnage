import { BULLET } from "../../../CONST.js";
import { Moveable } from "../../Interface/Moveable.js";

class Bullet extends Moveable {
    constructor({x, y, angle}) {
        super(x, y, BULLET.w, BULLET.h, BULLET.radius);
        this.speedX = BULLET.speed * Math.cos(angle);
        this.speedY = BULLET.speed * Math.sin(angle);
        this.angle = angle;
        this.color = BULLET.color;
    }

    draw(context)
    {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.w;
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.h * Math.cos(this.angle), this.y + this.h * Math.sin(this.angle));
        context.stroke();
    }

    setAngle(value) {
        this.angle = value;
    }

    getAngle() {
        return this.angle;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    getSpeed() {
        return { speedX: this.speedX, speedY: this.speedY };
    }

    updatePosition() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

export { Bullet }