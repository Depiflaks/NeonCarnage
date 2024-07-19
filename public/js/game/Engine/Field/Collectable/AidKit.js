import {AIDKIT} from "../../../CONST.js";
import {Collectable} from "./Collectable.js";

class AidKit extends Collectable {
    constructor(x, y, image, amount) {
        super(x, y);
        this.image = new Image();
        this.image.src = image;
        this.amount = amount;
        this.active = true;
    }

    draw(context) {
        const aidKitX = this.x - AIDKIT.w / 2;
        const aidKitY = this.y - AIDKIT.h / 2;
        context.drawImage(this.image, aidKitX, aidKitY, AIDKIT.w, AIDKIT.h);
    }

    respawn(delay = 5000) {
        setTimeout(() => {
            this.active = true;
        }, delay);
    }

    update() {}
}

export { AidKit };
