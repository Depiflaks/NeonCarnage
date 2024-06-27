import { Drawable } from "../Interface/Drawable.js";
import { WALL_SET } from "../settings.js";
import {CELL_SET} from "../settings.js";

class Wall extends Drawable {
    constructor(startX, startY, endX, endY) {
        super()
        this.startX = startX * CELL_SET.w;
        this.startY = startY * CELL_SET.h;
        this.endX = endX * CELL_SET.w;
        this.endY = endY * CELL_SET.h;
    }

    /**
     * 
     * @param {canvas} context отрисовка канвас 2d
     */
    draw(context) {
        context.fillStyle = WALL_SET.c;
        context.fillRect(this.x, this.y, this.w, this.h);
    }

}

export { Wall }