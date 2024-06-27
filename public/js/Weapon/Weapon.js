import { WEAPON_SET } from "../settings.js";
import { CELL_SET } from "../settings.js";
import { Drawable } from "../Interface/Drawable.js";

const state = {
    onTheGround, 
    inTheHand,
}

class Weapon extends Drawable {
    constructor({name, x, y, battleType, rapidity, grouping, deviation, status, onGround, inHand}) {
        super(x * CELL_SET.w + CELL_SET.w * 0.5, y * CELL_SET.h + CELL_SET.h * 0.5, WEAPON_SET.w, WEAPON_SET.h)
        this.name = name;
        this.battleType = battleType;
        this.rapidity = rapidity;
        this.grouping = grouping;
        this.deviation = deviation;
        this.onGround = onGround;   
        this.inHand = inHand;
        this.status = state.onTheGround; 
    }
   /**
    * 
    * @param {*} context 
    * @param {*} player 
    */
    draw(context, player) {
        if (this.status === state.onTheGround) {
            const weaponX = this.x - (WEAPON_SET.w * 0.5);
            const weaponY = this.y - (WEAPON_SET.h * 0.5);
            context.fillStyle = this.onGround;
            context.fillRect(weaponX, weaponY, WEAPON_SET.w, WEAPON_SET.h);   
        }
        if (this.status === state.inTheHand) {
            const weaponX = this.x - (WEAPON_SET.w * 0.5);
            const weaponY = this.y - (WEAPON_SET.h * 0.5);
            context.fillStyle = this.inHand;
            context.fillRect(weaponX, weaponY, (WEAPON_SET.w/2), (WEAPON_SET.h/2));
        }
    }
}

export { Weapon }