import { WEAPON, CELL, WEAPON_STATE } from "../CONST.js";
import { Drawable } from "../Interface/Drawable.js";

class WeaponModel extends Drawable {
    constructor({name, x, y, battleType, rapidity, grouping, deviation, status, onGround, inHand, amount, rechargeTime}) {
        super(x * CELL.w + CELL.w * 0.5, y * CELL.h + CELL.h * 0.5, WEAPON.w, WEAPON.h)
        this.model.name = name;
        this.model.battleType = battleType;
        this.model.rapidity = rapidity;
        this.model.grouping = grouping;
        this.model.deviation = deviation;
        this.model.onGroundColor = onGround;   
        this.model.inHandColor = inHand;
        this.model.status = WEAPON_STATE.onTheGround; 
        this.model.shootingInterval;
        this.model.amount = amount;
        this.model.maxAmount = amount;
        this.model.isRecharging = false;
        this.model.rechargeTime = rechargeTime;
    }
}

export { WeaponModel }