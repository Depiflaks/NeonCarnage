// Collectable.js
import { Drawable } from "../Interface/Drawable.js";
import {CELL} from "../CONST.js";

class Collectable extends Drawable {
    constructor(x, y) {
        super(0, 0, 20, 20);
        this.x = x * CELL.w + CELL.w * 0.5;
        this.y = y * CELL.h + CELL.h * 0.5;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }
}

export { Collectable };
