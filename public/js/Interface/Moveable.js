import { Drawable } from "./Drawable.js";

class Moveable extends Drawable {
    constructor(x, y, w, h, radius) {
        super(x, y, w, h);
        this.radius = radius;
        this.alpha = 0;
        this.speedX = 0;
        this.speedY = 0;
    }

    isIntersect(obj) {
        const nearestX = Math.max(obj.x, Math.min(this.x, obj.x + obj.w));
        const nearestY = Math.max(obj.y, Math.min(this.y, obj.y + obj.h));

        const deltaX = this.x - nearestX;
        const deltaY = this.y - nearestY;

        return (deltaX * deltaX + deltaY * deltaY) <= (this.radius * this.radius);
    }
}

export { Moveable };