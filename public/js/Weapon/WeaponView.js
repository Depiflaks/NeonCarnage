import { WEAPON_SET, PLAYER_SET, CELL_SET, WEAPON_STATE } from "../settings.js";

class WeaponView {
    constructor() {
    }

    draw({x, y, status, onGround, inHand}, player, context) {
        if (status === WEAPON_STATE.onTheGround) {
            this.drawOnGround(x, y, onGround, context);  
        }
        if (status === WEAPON_STATE.inTheHand) {
            this.drawInHand(inHand, player, context);
        }
    }

    drawOnGround(x, y, onGround, context) {
        const weaponX = x;
        const weaponY = y;
        context.fillStyle = onGround;
        context.fillRect(weaponX, weaponY, WEAPON_SET.w, WEAPON_SET.h); 
    }

    drawInHand(inHand, player, context) {
        const { x, y } = player.getPosition();
        const angle = player.getAngle();
        const weaponX = x + PLAYER_SET.w * Math.cos(angle + Math.PI / 2) / 2;
        const weaponY = y + PLAYER_SET.w * Math.sin(angle + Math.PI / 2) / 2;
        context.lineWidth = WEAPON_SET.w;
        context.strokeStyle = inHand;
        context.beginPath();
        context.moveTo(weaponX, weaponY);
        context.lineTo(weaponX + WEAPON_SET.h * Math.cos(angle), weaponY + WEAPON_SET.h * Math.sin(angle));
        context.stroke();
    }
}

export { WeaponView };