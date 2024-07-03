import { BULLET } from "../CONST.js";
import { Moveable } from "../Interface/Moveable.js";

class Bullet extends Moveable {
    constructor({x, y, angle, rapidity, deviation}) {
        super(x, y, BULLET.w, BULLET.h, BULLET.radius);

        const angleDeviation = (Math.random() * 2 - 1) * deviation;
        const adjustedAngle = angle + angleDeviation;

        this.speedX = BULLET.speed * Math.cos(adjustedAngle);
        this.speedY = BULLET.speed * Math.sin(adjustedAngle);
        this.angle = adjustedAngle;
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

    setSpeed(direction, value) {
        if (direction === 'x') {
            this.speedX = value;
        } else if (direction === 'y') {
            this.speedY = value;
        }
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