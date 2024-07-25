import { SKINS } from "../../../CONST.js";

class Skin {
    constructor({ skinId }) {
        this.head = new Image();
        this.body = {
            none: new Image(),
            one: new Image(),
            two: new Image(),
        }
        this.head.src = SKINS[skinId].head;
        this.body.none.src = SKINS[skinId].body;
        this.body.one.src = SKINS[skinId].bodyWithPistols;
        this.body.two.src = SKINS[skinId].bodyWithWeapon;
    }
}

export {Skin}