import { WEAPON, CELL, WEAPON_STATE } from "../CONST.js";
import { Drawable } from "../Interface/Drawable.js";

class WeaponModel extends Drawable {
    constructor({name, x, y, battleType, rapidity, grouping, deviation, status, onGround, inHand, amount, rechargeTime}) {
        super(x * CELL.w + CELL.w * 0.5, y * CELL.h + CELL.h * 0.5, WEAPON.w, WEAPON.h)
        this.name = name;
        this.battleType = battleType;
        this.rapidity = rapidity;
        this.grouping = grouping;
        this.deviation = deviation;
        this.onGround = new Image();
        this.onGround.src = onGround;
        this.inHand = new Image();
        this.inHand.src = inHand;
        this.status = WEAPON_STATE.onTheGround; 
        this.shootingInterval;
        this.amount = amount;
        this.maxAmount = amount;
        this.isRecharging = false;
        this.rechargeTime = rechargeTime;
    }
}

export { WeaponModel }