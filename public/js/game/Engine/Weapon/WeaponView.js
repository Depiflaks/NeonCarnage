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
        context.drawImage(weapon.getOnGround(), x, y);
    }

    drawInHand(weapon, entities, context) {
        // доделать траекторию, когда начнём получать её с бэкенда
        //if (animation && animation.isAnimating) return;
        for (const entity of entities) {
            if (entity.getWeaponId() !== weapon.getId()) continue;
            switch (weapon.getName()) {
                case "knife":
                    this.drawKnife(weapon, entity, context);
                    break;
                case "pistol":
                    this.drawPistol(weapon, entity, context);
                    break;
                case "glock":
                    this.drawPistol(weapon, entity, context);
                    break;
                case "rifle":
                    this.drawShotGun(weapon, entity, context);
                    break;
                case "machineGun":
                    this.drawShotGun(weapon, entity, context);
                    break;
            }
        }
        
    }

    drawKnife(weapon, entity, context) {
        const weaponX = ENTITY.h;
        const weaponY = -model.inHand.height / 2;
        context.save();
        context.translate(rotateX, rotateY);
        context.rotate(angle + 90 * RAD);
        context.drawImage(model.inHand, weaponX, weaponY, model.w, model.h);
        context.restore();
    }

    drawPistol(weapon, entity, context) {
        const weaponX = -ENTITY.h / 5;
        const weaponY = -weapon.model.inHand.height;
        context.save();
        context.translate(rotateX, rotateY);
        context.rotate(angle + 90 * RAD);
        context.drawImage(model.inHand, weaponX, weaponY, model.w, model.h);
        context.restore();        
    }

    drawShotGun(weapon, entity, context) {
        const weaponX = -ENTITY.h / 2;
        const weaponY = -model.inHand.height;
        context.save();
        context.translate(rotateX, rotateY);
        context.rotate(angle + 90 * RAD);
        context.drawImage(model.inHand, weaponX, weaponY, model.w, model.h);
        context.restore();
    }
}

export { WeaponView };