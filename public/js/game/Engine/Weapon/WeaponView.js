import { WEAPON, ENTITY, CELL, WEAPON_STATE, RAD } from "../../CONST.js";

class WeaponView {
    constructor() {
    }

    draw(weapon, entities, context) {
        if (weapon.getStatus() === WEAPON_STATE.onTheGround) {
            //console.log(1);
            this.drawOnGround(weapon, context);  
        }
        if (weapon.getStatus() === WEAPON_STATE.inTheHand) {
            //console.log(2);
            this.drawInHand(weapon, entities, context);
        }
    }

    drawOnGround(weapon, context) {
        const {x, y} = weapon.getPosition();
        context.drawImage(weapon.getOnGround(), x, y);
    }

    drawInHand(weapon, entities, context) {
        // доделать траекторию, когда начнём получать её с бэкенда
        //if (animation && animation.isAnimating) return;
        for (const entity of entities) {
            //console.log(entity, entity.getWeaponId(), weapon.getId());
            if (entity.getWeaponId() !== weapon.getId()) continue;
            const {x: px, y: py} = entity.getPosition();
            const {weaponX, weaponY} = this.getParam(weapon);
            
            context.save();
            context.translate(px, py);
            context.rotate(entity.getAngle() + 90 * RAD);
            context.drawImage(weapon.getInHand(), weaponX, weaponY, weapon.model.w, weapon.model.h);
            context.restore();
        }
    }

    getParam(weapon) {
        switch (weapon.getName()) {
            case "knife":
                return {weaponX: ENTITY.h, weaponY: -weapon.model.inHand.height / 2}
            case "glock":
            case "pistol":
                return {weaponX: -ENTITY.h / 5, weaponY: -weapon.model.inHand.height};
            case "machineGun":
            case "rifle":
                return {weaponX: -ENTITY.h / 2, weaponY: -weapon.model.inHand.height}
        }
    }
}

export { WeaponView };