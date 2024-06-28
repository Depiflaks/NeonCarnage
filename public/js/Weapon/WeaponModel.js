import { WEAPON_SET, CELL_SET, WEAPON_STATE } from "../settings.js";
import { Drawable } from "../Interface/Drawable.js";

class WeaponModel extends Drawable {
    constructor({name, x, y, battleType, rapidity, grouping, deviation, status, onGround, inHand}) {
        super(x * CELL_SET.w + CELL_SET.w * 0.5, y * CELL_SET.h + CELL_SET.h * 0.5, WEAPON_SET.w, WEAPON_SET.h)
        this.name = name;
        this.battleType = battleType;
        this.rapidity = rapidity;
        this.grouping = grouping;
        this.deviation = deviation;
        this.onGround = onGround;   
        this.inHand = inHand;
        this.status = WEAPON_STATE.onTheGround; 
        this.shootingInterval;
        this.shotDelay = false;
    }
}

export { WeaponModel }