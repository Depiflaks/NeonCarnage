import { WALL_SET } from "../settings.js";
import {CELL_SET} from "../settings.js";

class Wall {
    constructor(startX, startY, endX, endY, context) {
        this.startX = startX * CELL_SET.w;
        this.startY = startY * CELL_SET.h;
        this.endX = endX * CELL_SET.w;
        this.endY = endY * CELL_SET.h;
        this.context = context;
        if (this.startX === this.endX) {
            this.wallStartY = this.startY;
            this.wallStartX = (this.startX)- WALL_SET.h;
            this.wallXSide = WALL_SET.h * 2;
            this.wallYSide = (this.endY - this.startY);
        } else {
            if (this.startY === this.endY){
                this.wallStartX = this.startX;
                this.wallStartY = (this.startY) - WALL_SET.h;
                this.wallXSide =  (this.endX - this.startX);
                this.wallYSide = WALL_SET.h * 2;
            }
        } 
    }

    draw() {
        this.context.fillStyle = WALL_SET.c;
        this.context.fillRect(this.wallStartX, this.wallStartY, this.wallXSide, this.wallYSide);
    }

    move(dx, dy){
        this.startX += dx;
        this.startY += dy;
        this.endX += dx;
        this.endY += dy;
        this.wallStartY += dy;
        this.wallStartX += dx;

    }
}

export { Wall }