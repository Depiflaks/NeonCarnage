import { CELL_SET } from "../settings.js";
import { Drawable } from "../Interface/Drawable.js";

class Cell extends Drawable {
    constructor(x, y) {
        super(x * CELL_SET.w, y * CELL_SET.h, CELL_SET.w, CELL_SET.h);
    }
    
    draw(context) {
        context.fillStyle = this.active ? CELL_SET.activeColor : CELL_SET.inactiveColor;
        context.fillRect(this.x, this.y, CELL_SET.w, CELL_SET.h);
    }
}

export {Cell}