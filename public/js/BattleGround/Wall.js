import { wallSet } from "../settings.js";
import {cellSet} from "../settings.js";

class Wall {
    constructor(startX, startY, endX, endY, context) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.context = context;
    }

    drawWall() {
        if (this.startX === this.endX) {
            var wallStartY = this.startY * cellSet.w;
            var wallStartX = (this.startX * cellSet.w)- wallSet.h;
            var wallXSide = wallSet.h * 2;
            var wallYSide = (this.endY - this.startY) * cellSet.w;
        } else {
            if (this.startY === this.endY){
             var wallStartX = this.startX * cellSet.w;
             var wallStartY = (this.startY * cellSet.w) - wallSet.h;
             var wallXSide =  (this.endX - this.startX) * cellSet.w;
             var wallYSide = wallSet.h * 2;
            }
        } 
        this.context.fillStyle = wallSet.c;
        this.context.fillRect(wallStartX, wallStartY, wallXSide, wallYSide);
    }

    moveWall(dx, dy){
        this.startX += dx;
        this.startY += dy;
        this.endX += dx;
        this.endY += dy;
    }
}

export {Wall}