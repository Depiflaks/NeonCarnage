import { wallSet } from "../settings.js";


class Wall {
    constructor(startX, startY, endX, endY, canvasContext) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.canvasContext = canvasContext;
    }

    drawWall() {
        if (startX = endX) {
            const wallStartY = this.startY - wallSet.h;
            const wallStartX = this.startX;
        } else {
            if (startY = endY){
                const wallStartX = this.startY - wallSet.h;
                const wallStartY = this.startY;
            }
        } 
        this.canvasContext.fillStyle = wallSet.c;
        this.canvasContext.fillRect(wallStartX, wallStartY, this.endX - this.startX, this.endY - this.startY);
    }
}

export {Wall}