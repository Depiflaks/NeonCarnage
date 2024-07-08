import { ENTITY } from "../../CONST.js";
import { EntityModel } from "../Entity/EntityModel.js";

class EnemyModel extends EntityModel {
<<<<<<< Updated upstream
    constructor({ x, y, angle }) {
=======
    constructor({ x, y, angle, health, maxHealth }) {
>>>>>>> Stashed changes
        super({x, y});
        this.factX = 0;
        this.factY = 0;
        this.angle = angle;
        this.health = health;
        this.maxHealth = maxHealth;
    }
}

export {EnemyModel}