import { wallSet } from "../settings.js";
import {cellSet} from "../settings.js";

class Wall {
    constructor(startX, startY, endX, endY, canvasContext) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.canvasContext = canvasContext;
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
        this.canvasContext.fillStyle = wallSet.c;
        this.canvasContext.fillRect(wallStartX, wallStartY, wallXSide, wallYSide);
        //console.log(wallStartX, wallStartY, wallXSide, wallYSide);
    }
}

export {Wall}