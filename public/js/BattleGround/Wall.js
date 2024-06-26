import { WALL_SET } from "../settings.js";
import {CELL_SET} from "../settings.js";

class Wall {
    constructor(startX, startY, endX, endY, context) {
        this.startX = startX * CELL_SET.w;
        this.startY = startY * CELL_SET.h;
        this.endX = endX * CELL_SET.w;
        this.endY = endY * CELL_SET.h;
        this.context = context;
    }

    draw() {
        this.context.fillStyle = WALL_SET.c;
        this.context.fillRect(this.x, this.y, this.w, this.h);
    }

    move(dx, dy){
        this.startX += dx;
        this.startY += dy;
        this.endX += dx;
        this.endY += dy;
        this.y += dy;
        this.x += dx;

    }
}

export { Wall }