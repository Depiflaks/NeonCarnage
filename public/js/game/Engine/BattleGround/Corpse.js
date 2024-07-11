import { ENTITY, SKINS } from "../../CONST.js";
import { Drawable } from "../Interface/Drawable.js";

class Corpse extends Drawable {
    constructor(x, y, skinId) {
        super(x, y, 150, 150);
        this.skinId = skinId;
        this.image = new Image();
        this.image.src = SKINS[skinId].corpse;
    }

    draw({dx, dy}, context) {
        const x = this.x - this.w / 2 + dx;
        const y = this.y - this.h / 2 + dy;
        context.drawImage(this.image, x, y, this.w, this.h);
    }
}

export {Corpse}