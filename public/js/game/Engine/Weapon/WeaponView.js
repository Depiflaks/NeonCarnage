import { WEAPON, ENTITY, CELL, WEAPON_STATE, RAD } from "../../CONST.js";

class WeaponView {
    constructor() {
    }

    draw(model, animation, {x: px, y: py}, angle, context) {
        if (model.status === WEAPON_STATE.onTheGround) {
            this.drawOnGround(model.x, model.y, model.onGround, context);  
        }
        if (model.status === WEAPON_STATE.inTheHand) {
            this.drawInHand(model, {px, py}, angle, animation, context);
        }
    }

    drawOnGround(x, y, onGround, context) {
        const weaponX = x - CELL.w * 0.5;
        const weaponY = y - CELL.h * 0.25;
        context.drawImage(onGround, weaponX, weaponY);
    }

    drawInHand(model, {px, py}, angle, animation, context) {
        if (!((animation === null) || (animation) && (!animation.isAnimating))) return;
        switch (model.name) {
            case "knife":
                this.drawKnife(model, px, py, angle, context);
                break;
            case "pistol":
                this.drawPistol(model, px, py, angle, context);
                break;
            case "glock":
                this.drawPistol(model, px, py, angle, context);
                break;
            case "rifle":
                this.drawShotGun(model, px, py, angle, context);
                break;
            case "machineGun":
                this.drawShotGun(model, px, py, angle, context);
                break;
        }
    }

    drawKnife(model, rotateX, rotateY, angle, context) {
        const weaponX = ENTITY.h;
        const weaponY = -model.inHand.height / 2;
        context.save();
        context.translate(rotateX, rotateY);
        context.rotate(angle + 90 * RAD);
        context.drawImage(model.inHand, weaponX, weaponY, model.w, model.h);
        context.restore();
    }

    drawPistol(model, rotateX, rotateY, angle, context) {
        const weaponX = -ENTITY.h / 5;
        const weaponY = -model.inHand.height;
        context.save();
        context.translate(rotateX, rotateY);
        context.rotate(angle + 90 * RAD);
        context.drawImage(model.inHand, weaponX, weaponY, model.w, model.h);
        context.restore();        
    }

    drawShotGun(model, rotateX, rotateY, angle, context) {
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