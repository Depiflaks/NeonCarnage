import { Drawable } from "../Interface/Drawable.js";
import { WALL_SET } from "../settings.js";
import {CELL_SET} from "../settings.js";

class Wall extends Drawable {
    constructor(startX, startY, endX, endY) {
        super()
        this.startIndX = startX;
        this.startIndY = startY;
        this.endIndX = endX;
        this.endIndY = endY;
        this.startX = startX * CELL_SET.w;
        this.startY = startY * CELL_SET.h;
        this.endX = endX * CELL_SET.w;
        this.endY = endY * CELL_SET.h;
    }

    draw(context) {
        context.fillStyle = WALL_SET.activeColor;
        context.fillRect(this.x, this.y, this.w, this.h);
    }

}

export { Wall }