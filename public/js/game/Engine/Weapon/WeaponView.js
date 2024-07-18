import { WEAPON, ENTITY, CELL, WEAPON_STATE, RAD } from "../../CONST.js";

class WeaponView {
    constructor() {
    }

    draw(weapon, entities, context) {
        if (weapon.getStatus() === WEAPON_STATE.onTheGround) {
            this.drawOnGround(weapon, context);  
        }
        if (weapon.getStatus() === WEAPON_STATE.inTheHand) {
            this.drawInHand(weapon, entities, context);
        }
    }

    drawOnGround(weapon, context) {
        const {x, y} = weapon.getPosition();
        context.drawImage(weapon.getOnGround(), x - CELL.h / 2, y - CELL.h / 4);
    }

    drawInHand(weapon, entities, context) {
        for (const entity of entities) {
            if (entity) {
                if (entity.getMeleeStrike()) return;
            }
            if (entity.getWeaponId() !== weapon.getId()) continue;
            const {x: px, y: py} = entity.getPosition();

            const {weaponX, weaponY} = this.getParam(weapon);

            context.save();
            context.translate(px, py);
            context.rotate(entity.getAngle() + 90 * RAD);
            context.drawImage(weapon.getInHand(), weaponX, weaponY, weapon.getWidth(), weapon.getHeight());
            context.restore();
        }
    }

    getParam(weapon) {
        switch (weapon.getName()) {
            case "knife":
                return {weaponX: ENTITY.h, weaponY: -weapon.getInHand().height / 2}
            case "glock":
            case "pistol":
                return {weaponX: -ENTITY.h / 5, weaponY: -weapon.getInHand().height};
            case "machineGun":
            case "rifle":
                return {weaponX: -ENTITY.h / 2, weaponY: -weapon.getInHand().height}
        }
    }
}

export { WeaponView };