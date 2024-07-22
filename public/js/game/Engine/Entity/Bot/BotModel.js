import { EnemyModel } from "../Enemy/EnemyModel.js";

class BotModel extends EnemyModel {
    constructor({ x, y, angle, skinId }) {
        super({ x, y, angle, skinId });
        console.log(this)
    }
}

export {BotModel}