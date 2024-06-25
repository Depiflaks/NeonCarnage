import { cellSet } from "../settings.js";

class Cell {
    constructor(x, y, context) {
        this.x = x * cellSet.w;
        this.y = y * cellSet.h;
        this.context = context;
    }
    
    draw() {
        this.context.fillStyle = cellSet.c;
        this.context.fillRect(this.x, this.y, cellSet.w, cellSet.h);
    }

    move(dx, dy){
        this.x += dx;
        this.y += dy;
        this.context.fillStyle = cellSet.c;
        this.context.fillRect(this.x, this.y, cellSet.w, cellSet.h);
    }
}

export {Cell}