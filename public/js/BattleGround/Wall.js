import { Drawable } from "../Interface/Drawable.js";
import { WALL } from "../CONST.js";
import {CELL} from "../CONST.js";

class Wall extends Drawable {
    constructor(startX, startY, endX, endY) {
        super()
        this.startIndX = startX;
        this.startIndY = startY;
        this.endIndX = endX;
        this.endIndY = endY;
        this.startX = startX * CELL.w;
        this.startY = startY * CELL.h;
        this.endX = endX * CELL.w;
        this.endY = endY * CELL.h;
    }
}

export { Wall }