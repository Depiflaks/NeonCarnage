import { WEAPON_SET, PLAYER_SET, CELL_SET } from "../settings.js";
import { Drawable } from "../Interface/Drawable.js";

const state = {
    onTheGround: 0, 
    inTheHand: 1,
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

    setPlayer(player) {
        this.player = player;
    }

    unsetPlayer(){
        this.x = this.player.x;
        this.y = this.player.y;
        this.player = 0;
    }
   
    draw(context) {
        if (this.status === state.onTheGround) {
            const weaponX = this.x;
            const weaponY = this.y;
            context.fillStyle = this.onGround;
            context.fillRect(weaponX, weaponY, WEAPON_SET.w, WEAPON_SET.h);   
        }
        if (this.status === state.inTheHand) {
            const alpha = this.player.getAlpha();
            const weaponX = this.player.x + PLAYER_SET.w * Math.cos(alpha + Math.PI / 2) / 2;
            const weaponY = this.player.y + PLAYER_SET.w * Math.sin(alpha + Math.PI / 2) / 2;
            context.fillStyle = this.inHand;
            context.fillRect(weaponX, weaponY, WEAPON_SET.w, WEAPON_SET.h);
        }
    }
}

export { Weapon, state }