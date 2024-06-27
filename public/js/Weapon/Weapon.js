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
<<<<<<< Updated upstream
        if (this.status === 1) {
            const weaponX = this.x - (WEAPON_SET.w * 0.5);
            const weaponY = this.y - (WEAPON_SET.h * 0.5);
            this.context.fillStyle = this.inHand;
            this.context.fillRect(weaponX, weaponY, (WEAPON_SET.w/2), (WEAPON_SET.h/2));
=======
        if (this.status === state.inTheHand) {
            const { x, y } = player.model.getPosition();
            const angle = player.model.getAngle();
            const weaponX = x + PLAYER_SET.w * Math.cos(angle + Math.PI / 2) / 2;
            const weaponY = y + PLAYER_SET.w * Math.sin(angle + Math.PI / 2) / 2;
            context.lineWidth = WEAPON_SET.w;
            context.strokeStyle = this.inHand;
            context.beginPath();
            context.moveTo(weaponX, weaponY);
            context.lineTo(weaponX + WEAPON_SET.h * Math.cos(angle), weaponY + WEAPON_SET.h * Math.sin(angle));
            context.stroke();
>>>>>>> Stashed changes
        }
    }
}

export { Weapon }