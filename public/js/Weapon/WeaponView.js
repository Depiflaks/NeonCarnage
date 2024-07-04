import { WEAPON, PLAYER, CELL, WEAPON_STATE, RAD } from "../CONST.js";

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
        const weaponX = x - CELL.w * 0.5;
        const weaponY = y - CELL.h * 0.25;
        context.drawImage(onGround, weaponX, weaponY);
    }

    drawInHand(inHand, {px, py}, angle, context) {
        const weaponX = -PLAYER.h / 2;
        const weaponY = -inHand.height;
        const rotateX = px;
        const rotateY = py;
        context.save();
        context.translate(rotateX, rotateY);
        context.rotate(angle + 90 * RAD);
        context.drawImage(inHand, weaponX, weaponY);
        context.restore();
    }
}

export { WeaponView };