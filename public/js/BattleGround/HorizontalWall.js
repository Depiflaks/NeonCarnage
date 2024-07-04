import { Wall } from "./Wall.js";
import { WALL } from "../CONST.js";

class HorizontalWall extends Wall {
    constructor(startX, startY, endX, endY){
        super(startX, startY, endX, endY);
        this.x = this.startX;
        this.y = (this.startY) - WALL.h;
        this.w =  (this.endX - this.startX);
        this.h = WALL.h * 2;
    }
}

export { HorizontalWall }