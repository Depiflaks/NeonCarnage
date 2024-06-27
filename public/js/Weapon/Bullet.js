import { BULLET_SET } from "../settings.js";
import { Moveable } from "../Interface/Moveable.js";

class Bullet extends Moveable {
    constructor({x, y, angle}) {
        super(x, y, BULLET_SET.w, BULLET_SET.h, BULLET_SET.radius);
        this.speedX = BULLET_SET.speed * Math.cos(angle);
        this.speedY = BULLET_SET.speed * Math.sin(angle);
        this.angle = angle;
        this.color = BULLET_SET.color;
    }

    draw(context)
    {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, BULLET_SET.radius, 0, 2 * Math.PI);
        context.fill();
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