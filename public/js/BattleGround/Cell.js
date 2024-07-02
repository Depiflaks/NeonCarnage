import { CELL_SET } from "../settings.js";
import { Drawable } from "../Interface/Drawable.js";

class Cell extends Drawable {
    constructor(x, y) {
        super(x * CELL_SET.w, y * CELL_SET.h, CELL_SET.w, CELL_SET.h);
        this.alpha = CELL_SET.activeAlpha;
        this.activeDirection = 0;
    }
    
    draw(context) {
        context.fillStyle = CELL_SET.color;
        context.fillRect(this.x, this.y, CELL_SET.w, CELL_SET.h);
        context.globalAlpha = this.alpha;
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, CELL_SET.w, CELL_SET.h);
        context.globalAlpha = 1.0;
    }

    update() {
        this.alpha += CELL_SET.deltaAlpha * this.activeDirection;
        if (this.alpha > CELL_SET.inactiveAlpha) { 
            this.alpha = CELL_SET.inactiveAlpha;
            this.activeDirection = 0;
        }
        if (this.alpha < CELL_SET.activeAlpha) {
            this.alpha = CELL_SET.activeAlpha;
            this.activeDirection = 0;
        }
    }
}

export {Cell}