import {AMMUNITION} from '../../../CONST.js'
import {Collectable} from "./Collectable.js";
class Ammunition extends Collectable {
    constructor(x, y, image, amount) {
        super(x, y);
        this.image = new Image();
        this.image.src = image;
        this.amount = amount;
        this.active = true;
    }

    draw(context) {
        const ammoX = this.x - AMMUNITION.w / 2;
        const ammoY = this.y - AMMUNITION.h / 2;
        context.drawImage(this.image, ammoX, ammoY, AMMUNITION.w, AMMUNITION.h);
    }

    respawn(delay = 5000) {
        setTimeout(() => {
            this.active = true;
        }, delay);
    }
}

export { Ammunition };
