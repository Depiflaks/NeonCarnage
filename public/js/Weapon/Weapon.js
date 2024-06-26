import { WEAPON_SET } from "../settings.js";
import { CELL_SET } from "../settings.js";


class Weapon {
    constructor(name, x, y, battleType, rapidity, grouping, deviation, status, onGround, inHand, context) {
        this.name = name;
        this.x = (x * CELL_SET.w) + (CELL_SET.w * 0.5);
        this.y = (y * CELL_SET.h) + (CELL_SET.h * 0.5);
        this.battleType = battleType;
        this.rapidity = rapidity;
        this.grouping = grouping;
        this.deviation = deviation;
        this.status = status;
        this.onGround = onGround;
        this.inHand = inHand;
        this.context = context;
    }
   
    draw() {
        if (this.status === 0) {
            var weaponX = this.x - (WEAPON_SET.w * 0.5);
            var weaponY = this.y - (WEAPON_SET.h * 0.5);
            this.context.fillStyle = this.onGround;
            this.context.fillRect(weaponX, weaponY, WEAPON_SET.w, WEAPON_SET.h);   
        }
        if (this.status === 1) {
            var weaponX = this.x - (WEAPON_SET.w * 0.5);
            var weaponY = this.y - (WEAPON_SET.h * 0.5);
            this.context.fillStyle = this.inHand;
            this.context.fillRect(weaponX, weaponY, (WEAPON_SET.w/2), (WEAPON_SET.h/2));
        }
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export { Weapon }