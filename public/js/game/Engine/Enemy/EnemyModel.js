import { ENTITY } from "../../CONST.js";
import { EntityModel } from "../Entity/EntityModel.js";

class EnemyModel extends EntityModel {
    constructor({ x, y, angle, health, maxHealth, skinId }) {
        super({x, y, skinId});
        this.factX = 0;
        this.factY = 0;
        this.angle = angle;
        this.health = health;
        this.maxHealth = maxHealth;
    }
}

export {EnemyModel}