import { ENTITY, SKINS } from "../../CONST.js";
import { Drawable } from "../Interface/Drawable.js";

class Corpse extends Drawable {
    constructor(x, y, skinId) {
        super(x, y, 250, 250);
        this.skinId = skinId;
        this.image = new Image();
        this.image.src = SKINS[skinId].corpse;
    }

    draw(context) {
        const bonusX = this.x - this.w / 2;
        const bonusY = this.y - this.h / 2;
        context.drawImage(this.image, bonusX, bonusY, this.w, this.h);
    }
}

export {Corpse}