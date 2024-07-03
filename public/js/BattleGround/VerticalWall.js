import { Wall } from "./Wall.js";
import { WALL_SET } from "../settings.js";

class VerticalWall extends Wall {
    constructor(startX, startY, endX, endY){
        super(startX, startY, endX, endY);
        this.y = this.startY;
        this.x = (this.startX)- WALL_SET.h;
        this.w = WALL_SET.h * 2;
        this.h = (this.endY - this.startY);
    }
}

export { VerticalWall }