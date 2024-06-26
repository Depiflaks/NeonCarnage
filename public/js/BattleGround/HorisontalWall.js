import { Wall } from "./Wall.js";
import { WALL_SET } from "../settings.js";

class HorisontalWall extends Wall {
    constructor(startX, startY, endX, endY, context){
        super(startX, startY, endX, endY, context);
        this.x = this.startX;
        this.y = (this.startY) - WALL_SET.h;
        this.w =  (this.endX - this.startX);
        this.h = WALL_SET.h * 2;
    }
}

export { HorisontalWall }