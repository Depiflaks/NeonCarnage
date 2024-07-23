import { EnemyModel } from "../Enemy/EnemyModel.js";

class BotModel extends EnemyModel {
    constructor({ x, y, angle, skinId, nickname}) {
        super({ x, y, skinId });
        this.shooting = false;
        this.nickname = nickname;
        console.log(this)
    }
}

export {BotModel}