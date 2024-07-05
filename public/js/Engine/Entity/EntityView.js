import { ENTITY, RAD } from "../../CONST.js";

class EntityView {
    constructor(context) {
        this.context = context;
        this.headImage = new Image();
        this.headImage.src = ENTITY.headColor;
        this.bodyImage = new Image();
        this.bodyImage.src = ENTITY.bodyColor;
        this.bodyWithWeaponImage = new Image();
        this.bodyWithWeaponImage.src = ENTITY.bodyWithWeapon;
    }

    draw({x, y}, weapon, angle) {
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle + 90 * RAD);
        if (weapon != null) {
            this.context.drawImage(this.bodyWithWeaponImage, -ENTITY.wWithWeapon/2, -ENTITY.hWithWeapon/1.5, ENTITY.wWithWeapon, ENTITY.hWithWeapon);
            this.context.drawImage(this.headImage, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
        } else {
            this.context.drawImage(this.bodyImage, -ENTITY.w/2, -ENTITY.h/2, ENTITY.w, ENTITY.h);
            this.context.drawImage(this.headImage, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
        }
        this.context.restore();
    }

}

export { EntityView };
