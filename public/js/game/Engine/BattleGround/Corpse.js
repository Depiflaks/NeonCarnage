import { ENTITY, SKINS } from "../../CONST.js";
import { Drawable } from "../Interface/Drawable.js";

class Corpse extends Drawable {
    constructor(x, y, skinId) {
        super(x, y, 150, 150);
        this.skinId = skinId;
    }

    draw(images, context) {
        const x = this.x - this.w / 2;
        const y = this.y - this.h / 2;
        context.drawImage(images[this.skinId], x, y, this.w, this.h);
    }
}

export {Corpse}