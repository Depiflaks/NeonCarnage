import { cellSet } from "../settings.js";

class Cell {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    }
    
    draw() {
        this.ctx.fillStyle = cellSet.c;
        this.ctx.fillRect(this.x * cellSet.w, this.y * cellSet.h, cellSet.w, cellSet.h);
    }
}

export {Cell}