import { ENTITY, TRAJECTORY, RAD } from "../../../CONST.js";
import { Drawable } from "../../Interface/Drawable.js";

class Trajectory extends Drawable {
    constructor(x, y, angle) {
        super(x, y, TRAJECTORY.width, TRAJECTORY.height);
        this.deltaAngle = TRAJECTORY.deltaAngle;
        this.animationSpeed = TRAJECTORY.animationSpeed;
        this.handPoint = TRAJECTORY.handPoint;
        this.currentAngle = 0;
        this.isAnimating = false;
        this.direction = 0;
        this.angle = angle;
        this.weaponLeft = new Image();
        this.weaponLeft.src = TRAJECTORY.knifeLeftImage;
        this.weaponRight = new Image();
        this.weaponRight.src = TRAJECTORY.knifeRightImage;

    }

    draw(context) {
        const { currentEndX, currentEndY } = this.calculateEndCoordinates();
        context.save();
        context.translate(this.x + this.h, this.y + this.w);
        context.rotate(this.angle + this.currentAngle + 90 * RAD);
        if (this.direction === 1) {
            context.drawImage(this.weaponLeft, this.x - currentEndX - ENTITY.h * 1.5, currentEndY - this.y - this.w / 1.15);
        } else {
            context.drawImage(this.weaponRight, this.x - currentEndX - ENTITY.h * 1.5, currentEndY - this.y - this.w / 1.15);
        }
        context.restore();
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

    update({ x, y }, angle, isStriking) {
        if (!this.isAnimating) return;
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

    calculateEndCoordinates() {
        const length = this.w;
        const currentEndX = this.x + length * Math.cos(this.angle + this.currentAngle);
        const currentEndY = this.y + length * Math.sin(this.angle + this.currentAngle);
        return { currentEndX, currentEndY };
    }

    isIntersect(wall) {
        const { currentEndX, currentEndY } = this.calculateEndCoordinates();

        const trajectoryLine = { x1: this.x, y1: this.y, x2: currentEndX, y2: currentEndY };
        const wallLines = [
            { x1: wall.x, y1: wall.y, x2: wall.x + wall.w, y2: wall.y }, // верхняя грань
            { x1: wall.x + wall.w, y1: wall.y, x2: wall.x + wall.w, y2: wall.y + wall.h }, // правая грань
            { x1: wall.x + wall.w, y1: wall.y + wall.h, x2: wall.x, y2: wall.y + wall.h }, // нижняя грань
            { x1: wall.x, y1: wall.y + wall.h, x2: wall.x, y2: wall.y } // левая грань
        ];

        return wallLines.some(wallLine => this.checkLineIntersection(trajectoryLine, wallLine));
    }

    // Метод для проверки пересечения двух линий
    checkLineIntersection(line1, line2) {
        const { x1, y1, x2, y2 } = line1;
        const { x1: x3, y1: y3, x2: x4, y2: y4 } = line2;

        const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        if (denominator === 0) return false;

        const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
        const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

        return (ua >= 0 && ua <= 1) && (ub >= 0 && ub <= 1);
    }
}

export { Trajectory };
