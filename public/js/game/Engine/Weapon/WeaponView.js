import { WEAPON, ENTITY, CELL, WEAPON_STATE, RAD } from "../../CONST.js";

class WeaponView {
    constructor() {
    }

    draw(weapon, player, enemies, context) {
        if (weapon.getStatus() === WEAPON_STATE.onTheGround) {
            this.drawOnGround(weapon, context);  
        }
        if (weapon.getStatus() === WEAPON_STATE.inTheHand) {
            this.drawInHand(, context);
        }
    }

    drawOnGround(model, context) {
        const {x, y} = model.getPosition();
        const weaponX = x - CELL.w * 0.5;
        const weaponY = y - CELL.h * 0.25;
        context.drawImage(model.onGround, weaponX, weaponY);
    }

    drawInHand(model, {px, py}, angle, animation, context) {
        if ((animation === null) ||(animation != null) && (!animation.isAnimating))  {
            const weaponX = -ENTITY.h / 2;
            const weaponY = -model.inHand.height;
            const rotateX = px;
            const rotateY = py;
            context.save();
            context.translate(rotateX, rotateY);
            context.rotate(angle + 90 * RAD);
            context.drawImage(model.inHand, weaponX, weaponY, model.w, model.h);
            context.restore();
        }
    }

}

export { WeaponView };