import { SKINS } from "../../CONST.js";

class SkinModel {
    constructor({ skinId }) {
        this.headImage = new Image();
        this.bodyImage = new Image();
        this.bodyWithWeaponImage = new Image();
        this.bodyWithPistolsImage = new Image();
        this.headImage.src = SKINS[skinId].head;
        this.bodyImage.src = SKINS[skinId].body;
        this.bodyWithWeaponImage.src = SKINS[skinId].bodyWithWeapon;
        this.bodyWithPistolsImage.src = SKINS[skinId].bodyWithPistols;
    }
}

export {SkinModel}