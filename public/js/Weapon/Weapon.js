import { weapon } from "../settings.js";
import { cellSet } from "../settings.js";


class Weapon {
    constructor(name, x, y, battleType, rapidity, grouping, deviation, status, onGround, inHand, context) {
        this.name = name;
        this.x = (x * cellSet.w) + (cellSet.w * 0.5);
        this.y = (y * cellSet.h) + (cellSet.h * 0.5);
        this.battleType = battleType;
        this.rapidity = rapidity;
        this.grouping = grouping;
        this.deviation = deviation;
        this.status = status;
        this.onGround = onGround;
        this.inHand = inHand;
        this.context = context;
    }
   
    drawWeapon() {
        if (this.status === 0) {
            var weaponX = this.x - (weapon.w * 0.5);
            var weaponY = this.y - (weapon.h * 0.5);
            this.context.fillStyle = this.onGround;
            this.context.fillRect(weaponX, weaponY, weapon.w, weapon.h);   
        }
        if (this.status === 1) {
            var weaponX = this.x - (weapon.w * 0.5);
            var weaponY = this.y - (weapon.h * 0.5);
            this.context.fillStyle = this.inHand;
            this.context.fillRect(weaponX, weaponY, (weapon.w/2), (weapon.h/2));
        }
    }

    moveWeapon(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export { Weapon }