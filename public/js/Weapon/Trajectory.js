import {Drawable} from "../Interface/Drawable.js";

class Trajectory extends Drawable {
    constructor() {
        super(0, 0, 150, 20);
        this.angle = 0;
        this.currentAngle = 0;
        this.deltaAngle = Math.PI / 4;
        this.isAnimating = false;
        this.animationSpeed = 0.1;
        this.direction = 0;
    }

    draw(context) {
        const length = this.maxLength;
        const currentEndX = this.x + length * Math.cos(this.angle + this.currentAngle);
        const currentEndY = this.y + length * Math.sin(this.angle + this.currentAngle);

        context.lineWidth = 10;
        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(currentEndX, currentEndY);
        context.stroke();
    }

    toLeft() {
        this.isAnimating = true;
        this.currentAngle = -this.deltaAngle;
        this.direction = 1;
    }

    toRight() {
        this.isAnimating = true;
        this.currentAngle = this.deltaAngle;
        this.direction = -1;
    }

    update({x, y}, angle, isStriking) {
        if (!this.isAnimating) return
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.currentAngle += this.animationSpeed * this.direction;
        if (this.direction === 1 && this.currentAngle > this.deltaAngle) {
            if (isStriking) {
                this.toRight();
            } else {
                this.isAnimating = false;
            }
        }
        if (this.direction === -1 && this.currentAngle < -this.deltaAngle) {
            if (isStriking) {
                this.toLeft();
            } else {
                this.isAnimating = false;
            }
        }
    }
}

export { Trajectory }
