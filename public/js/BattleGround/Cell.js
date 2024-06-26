import { CELL_SET } from "../settings.js";

class Cell {
    constructor(x, y, context) {
        this.x = x * CELL_SET.w;
        this.y = y * CELL_SET.h;
        this.context = context;
    }
    
    draw() {
        this.context.fillStyle = CELL_SET.c;
        this.context.fillRect(this.x, this.y, CELL_SET.w, CELL_SET.h);
    }

    move(dx, dy){
        this.x += dx;
        this.y += dy;
    }
}

export {Cell}