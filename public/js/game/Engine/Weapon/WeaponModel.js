import { CELL, WEAPON_STATE } from "../../CONST.js";
import { Drawable } from "../Interface/Drawable.js";

class WeaponModel extends Drawable {
    constructor({id, type, x, y}) {
        super(x * CELL.w + CELL.w * 0.5, y * CELL.h + CELL.h * 0.5, type.w, type.h)
        this.id = id;
        this.name = type.name;
        this.battleType = type.battleType;
        this.rapidity = type.rapidity;
        this.grouping = type.grouping;
        this.deviation = type.deviation;
        this.onGround = new Image();
        this.onGround.src = type.onGround;
        this.inHand = new Image();
        this.inHand.src = type.inHand;
        this.status = WEAPON_STATE.onTheGround; 
        this.shootingInterval;
        this.amount = type.amount;
        this.maxAmount = type.amount;
        this.isRecharging = false;
        this.rechargeTime = type.rechargeTime;
    }
}

export { WeaponModel }