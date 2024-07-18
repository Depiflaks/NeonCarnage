import { Wall } from "./Wall.js";
import { WALL, CELL } from "../../../../CONST.js";

class HorizontalWall extends Wall {
    constructor(startX, startY, endX, endY){
        super(startX, startY, endX, endY);
        this.x = this.startX;
        this.y = (this.startY) - WALL.h;
        this.w = (this.endX - this.startX);
        this.h = WALL.h * 2;
        this.wallImages = [];
        for (let i = startX; i < endX; i++) {
            this.wallImages.push(new Image());
            this.wallImages[this.wallImages.length - 1].src = WALL.horizontalBetweenImage;
        }
        if (this.wallImages.length > 1) {
            this.wallImages[0].src = WALL.horizontalStartImage;
            this.wallImages[this.wallImages.length - 1].src = WALL.horizontalEndImage;
        } else {
            this.wallImages[0].src = WALL.horizontalImage;
        }
    }

    draw(context) {
        for (let i = 0; i < this.wallImages.length; i++) {
            const wall = this.wallImages[i];
            context.drawImage(wall, this.x + i * CELL.w, this.y, CELL.w, this.h);
        }
    }
}

export { HorizontalWall }