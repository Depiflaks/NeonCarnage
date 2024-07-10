import {BONUS, CELL} from "../../CONST.js";
import {Collectable} from "./Collectable.js";

class Bonus extends Collectable {
    constructor(x, y, image, amount) {
        super(x, y);
        this.image = new Image();
        this.image.src = image;
        this.amount = amount;
        this.active = true;
    }

    draw(context) {
        const bonusX = this.x - BONUS.w / 2;
        const bonusY = this.y - BONUS.h / 2;
        context.drawImage(this.image, bonusX, bonusY, BONUS.w, BONUS.h);
        // context.fillStyle = this.color;
        // context.fillRect(bonusX, bonusY, BONUS.w, BONUS.h);
    }

    respawn(delay = 5000) {
        setTimeout(() => {
            this.active = true;
        }, delay);
    }
}

export { Bonus };
