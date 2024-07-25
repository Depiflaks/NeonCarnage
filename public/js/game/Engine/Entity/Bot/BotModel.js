import { EnemyModel } from "../Enemy/EnemyModel.js";
import {Skin} from "../Skin/Skin.js";
import {BotSkin} from "../Skin/BotSkin.js";

class BotModel extends EnemyModel {
    constructor({ x, y, angle, weaponId, skinId, maxHealth, health, id, shooting, isAlive, deviation, rapidity}) {
        super({ x, y, angle, skinId, maxHealth, health, id });
        this.id = id;
        this.shooting = shooting;
        this.isRecharging = false;
        //this.skin = new BotSkin({skinId});
        this.skin = new BotSkin({skinId});
        this.deviation = deviation;
        this.rapidity = rapidity;
    }
}

export {BotModel}