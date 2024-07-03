import { Wall } from "./Wall.js";
import { WALL } from "../CONST.js";

class VerticalWall extends Wall {
    constructor(startX, startY, endX, endY){
        super(startX, startY, endX, endY);
        this.y = this.startY;
        this.x = (this.startX)- WALL.h;
        this.w = WALL.h * 2;
        this.h = (this.endY - this.startY);
    }
}

export { VerticalWall }