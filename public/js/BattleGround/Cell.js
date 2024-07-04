import { CELL } from "../CONST.js";
import { Drawable } from "../Interface/Drawable.js";

class Cell extends Drawable {
    constructor(x, y) {
        super(x * CELL.w, y * CELL.h, CELL.w, CELL.h);
        this.alpha = CELL.activeAlpha;
        this.activeDirection = 0;
        this.cellImg = new Image();
        this.cellImg.src = CELL.src;
    }
    
    draw(context) {
        context.drawImage(this.cellImg, this.x, this.y, CELL.w, CELL.h)
        context.globalAlpha = this.alpha;
        // context.fillStyle = 'black';
        // context.fillRect(this.x, this.y, CELL.w, CELL.h);
        context.globalAlpha = 1.0;
    }

    update() {
        this.alpha += CELL.deltaAlpha * this.activeDirection;
        if (this.alpha > CELL.inactiveAlpha) { 
            this.alpha = CELL.inactiveAlpha;
            this.activeDirection = 0;
        }
        if (this.alpha < CELL.activeAlpha) {
            this.alpha = CELL.activeAlpha;
            this.activeDirection = 0;
        }
    }
}

export {Cell}