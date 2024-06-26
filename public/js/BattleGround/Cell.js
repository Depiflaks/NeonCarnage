import { CELL_SET } from "../settings.js";
import { Drawable } from "../Interface/Drawable.js";

class Cell extends Drawable {
    constructor(x, y, context) {
        super(x * CELL_SET.w, y * CELL_SET.h, CELL_SET.w, CELL_SET.h);
        this.context = context;
    }
    
    draw() {
        this.context.fillStyle = CELL_SET.c;
        this.context.fillRect(this.x, this.y, CELL_SET.w, CELL_SET.h);
    }
}

export {Cell}