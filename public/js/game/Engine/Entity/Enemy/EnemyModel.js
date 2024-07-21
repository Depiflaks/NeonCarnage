import { ENTITY } from "../../../CONST.js";
import { EntityModel } from "../EntityModel.js";

class EnemyModel extends EntityModel {
    constructor({ x, y, angle, health, maxHealth, skinId, nickName }) {
        super({x, y, skinId, nickName});
        this.factX = this.x;
        this.factY = this.y;
        this.angle = angle;
        this.health = health;
        this.maxHealth = maxHealth;
        this.lastHitTime = 0;
    }
}

export {EnemyModel}