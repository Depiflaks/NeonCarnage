import { cellSet } from "../settings.js";

class Cell {
    constructor(x, y, canvasContext) {
        this.x = x;
        this.y = y;
        this.canvasContext = canvasContext;
    }
    
    draw() {
        this.canvasContext.fillStyle = cellSet.c;
        this.canvasContext.fillRect(this.x * cellSet.w, this.y * cellSet.h, cellSet.w, cellSet.h);
    }
}

export {Cell}