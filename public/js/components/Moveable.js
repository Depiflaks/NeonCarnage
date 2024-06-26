import { Drawable } from "./Drawable.js";

class Moveable extends Drawable {
    constructor(x, y, w, h, radius) {
        super(x, y, w, h);
        this.radius = radius;
        this.alpha = 0;
        this.speedX = 0;
        this.speedY = 0;
    }
}

export { Moveable };