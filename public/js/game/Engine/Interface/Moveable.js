import { Drawable } from "./Drawable.js";
import { ENTITY } from "../../CONST.js";

class Moveable extends Drawable {
    constructor(x, y, w, h, radius) {
        super(x, y, w, h);
        this.radius = radius;
        this.angle = 0;
        this.speedX = 0;
        this.speedY = 0;
    }

    isIntersectEnemy(obj) {
        const deltaX = obj.x - this.x - this.h * Math.cos(this.angle);
        const deltaY = obj.y - this.y - this.h * Math.sin(this.angle);
        //context.lineTo(this.x + this.h * Math.cos(this.angle), this.y + this.h * Math.sin(this.angle));
        const distanceSquared = deltaX * deltaX + deltaY * deltaY;
        const combinedRadius = ENTITY.radius;
        return distanceSquared <= (combinedRadius * combinedRadius);
    }
    
    isIntersect(obj) {
        const nearestX = Math.max(obj.x, Math.min(this.x, obj.x + obj.w));
        const nearestY = Math.max(obj.y, Math.min(this.y, obj.y + obj.h));

        const deltaX = this.x - nearestX;
        const deltaY = this.y - nearestY;

        return (deltaX * deltaX + deltaY * deltaY) <= (this.radius * this.radius);
    }

    isIntersectLines(obj) {
        const endX = this.x + this.h * Math.cos(this.angle);
        const endY = this.y + this.h * Math.sin(this.angle);
    
        const bulletLine = {
            x1: this.x,
            y1: this.y,
            x2: endX,
            y2: endY
        };
    
        const objLines = [
            { x1: obj.x, y1: obj.y, x2: obj.x + obj.w, y2: obj.y },
            { x1: obj.x + obj.w, y1: obj.y, x2: obj.x + obj.w, y2: obj.y + obj.h },
            { x1: obj.x + obj.w, y1: obj.y + obj.h, x2: obj.x, y2: obj.y + obj.h },
            { x1: obj.x, y1: obj.y + obj.h, x2: obj.x, y2: obj.y }
        ];
    
        for (const line of objLines) {
            if (this.doLinesIntersect(bulletLine, line)) {
                return true;
            }
        }
        return false;
    }
    
    doLinesIntersect(line1, line2) {
        const det = (line1.x2 - line1.x1) * (line2.y2 - line2.y1) - (line1.y2 - line1.y1) * (line2.x2 - line2.x1);
        if (det === 0) {
            return false;
        }
    
        const lambda = ((line2.y2 - line2.y1) * (line2.x2 - line1.x1) + (line2.x1 - line2.x2) * (line2.y2 - line1.y1)) / det;
        const gamma = ((line1.y1 - line1.y2) * (line2.x2 - line1.x1) + (line1.x2 - line1.x1) * (line2.y2 - line1.y1)) / det;
    
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}

export { Moveable };