
import { AMMUNITION, WEAPON_STATE } from "../../CONST.js";
import { WeaponModel } from "./WeaponModel.js";
import { WeaponView } from "./WeaponView.js";

class WeaponController {
    constructor(weapon) {
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

    update(weapon, {dx, dy}) {
        this.model.x = weapon.x + dx;
        this.model.y = weapon.y + dy;
        this.model.amount = weapon.amount;
        this.model.status = weapon.state; 
    }

    pickupAmmunition(id, ammunition, player) {
        const { x, y } = player.getPosition();
        const distance = Math.sqrt((ammunition.x - x) ** 2 + (ammunition.y - y) ** 2);

        if (distance <= AMMUNITION.minDistance) {
            const currentAmount = this.getAmount();
            const maxAmount = this.getMaxAmount();
            if (currentAmount < maxAmount) {
                player.addAmount(Math.min(currentAmount + AMMUNITION.amount, maxAmount) - this.getAmount());
                player.addAmmunition(id);
            }
        }
    }

    getPosition() {
        return {x: this.model.x, y: this.model.y};
    }

    getWidth(){
        return this.model.w;
    }

    getHeight(){
        return this.model.h;
    }

    getId() {
        return this.model.id;
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