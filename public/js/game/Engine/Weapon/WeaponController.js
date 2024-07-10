
import { AMMUNITION } from "../../CONST.js";
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

    pickupAmmunition(ammunition, playerPosition) {
        const { x, y } = playerPosition;
        const distance = Math.sqrt((ammunition.x - x) ** 2 + (ammunition.y - y) ** 2);

        if (distance <= AMMUNITION.minDistance) {
            const currentAmount = this.getAmount();
            const maxAmount = this.getMaxAmount();

            if (currentAmount < maxAmount) {
                this.setAmount(Math.min(currentAmount + ammunition.amount, maxAmount));
                return false;
            }
        }
        return true;
    }
    isDistant() {
        return this.model.battleType === "distant";
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

    getOnGround() {
        return this.model.onGround;
    }

    getInHand() {
        return this.model.inHand;
    }

    getStatus() {
        return this.model.status;
    }

    setStatus(value) {
        this.model.status = value;
    }

    getShootingInterval() {
        return this.model.shootingInterval;
    }

    setShootingInterval(value) {
        this.model.shootingInterval = value;
    }

    getAmount() {
        return this.model.amount;
    }

    setAmount(value) {
        this.model.amount = value;
    }

    decAmount() {
        this.model.amount -= 1;
    }

    getMaxAmount() {
        return this.model.maxAmount;
    }

    isRecharging() {
        return this.model.isRecharging;
    }

    setRecharging(value) {
        this.model.isRecharging = value;
    }

    getRechargeTime() {
        return this.model.rechargeTime;
    }
}

export { WeaponController };