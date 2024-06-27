import { CELL_SET } from "../settings.js";
import { Drawable } from "../Interface/Drawable.js";

class Cell extends Drawable {
    constructor(x, y) {
        super(x * CELL_SET.w, y * CELL_SET.h, CELL_SET.w, CELL_SET.h);
    }
    
    /**
     * 
     * @param {canvas} context отрисовка канвас 2d
     */
    draw(context) {
        context.fillStyle = CELL_SET.c;
        context.fillRect(this.x, this.y, CELL_SET.w, CELL_SET.h);
    }
}

export {Cell}