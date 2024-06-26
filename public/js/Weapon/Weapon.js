import { WEAPON_SET } from "../settings.js";
import { CELL_SET } from "../settings.js";
import { Drawable } from "../Interface/Drawable.js";


class Weapon extends Drawable {
    constructor(name, x, y, battleType, rapidity, grouping, deviation, status, onGround, inHand, context) {
        super(x * CELL_SET.w + CELL_SET.w * 0.5, y * CELL_SET.h + CELL_SET.h * 0.5, WEAPON_SET.w, WEAPON_SET.h)
        this.name = name;
        this.battleType = battleType;
        this.rapidity = rapidity;
        this.grouping = grouping;
        this.deviation = deviation;
        this.status = status;   //0 - на земле, 1 - в руках
        this.onGround = onGround;   
        this.inHand = inHand;
        this.context = context;
    }
   
    draw() {
        if (this.status === 0) {
            var weaponX = this.x - (this.w * 0.5);
            var weaponY = this.y - (this.h * 0.5);
            this.context.fillStyle = this.onGround;
            this.context.fillRect(weaponX, weaponY, WEAPON_SET.w, WEAPON_SET.h);   
        }
        if (this.status === 1) {
            const weaponX = this.x - (WEAPON_SET.w * 0.5);
            const weaponY = this.y - (WEAPON_SET.h * 0.5);
            this.context.fillStyle = this.inHand;
            this.context.fillRect(weaponX, weaponY, (WEAPON_SET.w/2), (WEAPON_SET.h/2));
        }
    }
}

export { Weapon }