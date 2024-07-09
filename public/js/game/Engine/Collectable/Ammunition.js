import {AMMUNITION} from '../../CONST.js'
import {Collectable} from "./Collectable.js";
class Ammunition extends Collectable {
    constructor(x, y, image, amount) {
        super(x, y);
        this.image = new Image();
        //console.log(image)
        this.image.src = image;
        this.amount = amount;
    }

    draw(context) {
        const ammoX = this.x - AMMUNITION.w / 2;
        const ammoY = this.y - AMMUNITION.h / 2;
        //console.log(this.image.src);
        context.drawImage(this.image, ammoX, ammoY, AMMUNITION.w, AMMUNITION.h);
    }
}

export { Ammunition };
