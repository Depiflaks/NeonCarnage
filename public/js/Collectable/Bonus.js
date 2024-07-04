import {BONUS, CELL} from "../CONST.js";
import {Collectable} from "./Collectable.js";
class Bonus extends Collectable {
    constructor(x, y, color, effect) {
        super(x, y)
        this.color = BONUS.color;
        this.effect = effect;
    }

    draw(context) {
        const bonusX = this.x;
        const bonusY = this.y;
        context.fillStyle = this.color;
        context.fillRect(bonusX, bonusY, BONUS.w, BONUS.h);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export { Bonus };
