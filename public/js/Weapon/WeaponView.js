import { WEAPON, PLAYER, CELL, WEAPON_STATE } from "../CONST.js";

class WeaponView {
    constructor() {
    }

    draw({x, y, status, onGroundColor, inHandColor}, {x: px, y: py}, angle, context) {
        if (status === WEAPON_STATE.onTheGround) {
            this.drawOnGround(x, y, onGroundColor, context);  
        }
        if (status === WEAPON_STATE.inTheHand) {
            this.drawInHand(inHandColor, {px, py}, angle, context);
        }
    }

    drawOnGround(x, y, onGround, context) {
        const weaponX = x;
        const weaponY = y;
        context.fillStyle = onGround;
        context.fillRect(weaponX, weaponY, WEAPON.w, WEAPON.h); 
    }

    drawInHand(inHand, {px, py}, angle, context) {
        const weaponX = px + PLAYER.w * Math.cos(angle + Math.PI / 2) / 2;
        const weaponY = py + PLAYER.w * Math.sin(angle + Math.PI / 2) / 2;
        context.lineWidth = WEAPON.w;
        context.strokeStyle = inHand;
        context.beginPath();
        context.moveTo(weaponX, weaponY);
        context.lineTo(weaponX + WEAPON.h * Math.cos(angle), weaponY + WEAPON.h * Math.sin(angle));
        context.stroke();
    }
}

export { WeaponView };