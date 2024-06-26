import { wallSet } from "../settings.js";
import {cellSet} from "../settings.js";

class Wall {
    constructor(startX, startY, endX, endY, context) {
        this.startX = startX * cellSet.w;
        this.startY = startY * cellSet.h;
        this.endX = endX * cellSet.w;
        this.endY = endY * cellSet.h;
        this.context = context;
        if (this.startX === this.endX) {
            this.wallStartY = this.startY;
            this.wallStartX = (this.startX)- wallSet.h;
            this.wallXSide = wallSet.h * 2;
            this.wallYSide = (this.endY - this.startY);
        } else {
            if (this.startY === this.endY){
                this.wallStartX = this.startX;
                this.wallStartY = (this.startY) - wallSet.h;
                this.wallXSide =  (this.endX - this.startX);
                this.wallYSide = wallSet.h * 2;
            }
        } 
    }

    draw() {
        this.context.fillStyle = wallSet.c;
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