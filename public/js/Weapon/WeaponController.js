
import { WeaponModel } from "./WeaponModel.js";
import { WeaponView } from "./WeaponView.js";

class WeaponController {
    constructor (weapon) {
        this.model = new WeaponModel(weapon);
        this.view = new WeaponView();
    }

    unsetPlayer(player) {
        this.model.x = player.x;
        this.model.y = player.y;
    }

    recharge() {
        this.model.amount = this.model.maxAmount;
        this.model.isRecharging = false;
    }

    move(dx, dy) {
        this.model.move(dx, dy);
    }

    getName() {
        return this.model.name;
    }

    getBattleType() {
        return this.model.battleType;
    }

    getRapidity() {
        return this.model.rapidity;
    }

    getGrouping() {
        return this.model.grouping;
    }

    getDeviation() {
        return this.model.deviation;
    }

    getOnGroundColor() {
        return this.model.onGroundColor;
    }

    getInHandColor() {
        return this.model.inHandColor;
    }

    getStatus() {
        return this.model.status;
    }

    getShootingInterval() {
        return this.model.shootingInterval;
    }

    getAmount() {
        return this.model.amount;
    }

    getMaxAmount() {
        return this.model.maxAmount;
    }

    getIsRecharging() {
        return this.model.isRecharging;
    }

    getRechargeTime() {
        return this.model.rechargeTime;
    }
}

export { WeaponController };