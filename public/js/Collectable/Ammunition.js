import {AMMUNITION, CELL} from '../CONST.js'
import {Collectable} from "./Collectable.js";
class Ammunition extends Collectable {
    constructor(x, y, color, amount) {
        super(x, y);
        this.color = AMMUNITION.color;
        this.amount = amount;
    }

    draw(context) {
        const ammoX = this.x;
        const ammoY = this.y;
        context.fillStyle = this.color;
        context.fillRect(ammoX, ammoY, AMMUNITION.w, AMMUNITION.h);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export { Ammunition };
