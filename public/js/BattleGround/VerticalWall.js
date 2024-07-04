import { Wall } from "./Wall.js";
import { WALL, CELL } from "../CONST.js";

class VerticalWall extends Wall {
    constructor(startX, startY, endX, endY){
        super(startX, startY, endX, endY);
        this.y = this.startY;
        this.x = (this.startX)- WALL.h;
        this.w = WALL.h * 2;
        this.h = (this.endY - this.startY);
        this.wallImages = [];
        for (let i = startY; i < endY; i++) {
            this.wallImages.push(new Image());
            this.wallImages[this.wallImages.length - 1].src = WALL.verticalBetweenImage;
        }
        if (this.wallImages.length > 1) {
            this.wallImages[0].src = WALL.verticalStartImage;
            this.wallImages[this.wallImages.length - 1].src = WALL.verticalEndImage;
        } else {
            this.wallImages[0].src = WALL.verticalImage;
        }
    }

    draw(context) {
        for (let i = 0; i < this.wallImages.length; i++) {
            const wall = this.wallImages[i];
            context.drawImage(wall, this.x, this.y + i * CELL.h, this.w, CELL.h);
        }
    }
}

export { VerticalWall }