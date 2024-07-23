import { EnemyModel } from "../Enemy/EnemyModel.js";
import {ENTITY} from "../../../CONST.js";

class BotModel extends EnemyModel {
    constructor({ x, y, angle, weaponId, skinId, maxHealth, health, id}) {

        super({ x, y, angle, skinId, maxHealth, health, id });
        this.shooting = false;

        this.id = id;
        console.log(this)
    }
}

export {BotModel}