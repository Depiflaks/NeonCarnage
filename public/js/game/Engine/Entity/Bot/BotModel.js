import { EnemyModel } from "../Enemy/EnemyModel.js";
import {ENTITY} from "../../../CONST.js";

class BotModel extends EnemyModel {
    constructor({ x, y, angle, weaponId, skinId, maxHealth, health, id, shooting}) {

        super({ x, y, angle, skinId, maxHealth, health, id });
        this.id = id;
        this.shooting = shooting;
        this.isRecharging = false;
        console.log(this)
    }
}

export {BotModel}