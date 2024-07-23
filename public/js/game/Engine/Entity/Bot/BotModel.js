import { EnemyModel } from "../Enemy/EnemyModel.js";

class BotModel extends EnemyModel {
    constructor({ x, y, angle, skinId }) {
        console.log(angle)
        super({ x, y, skinId });
        console.log(this)
        this.shooting = false;
    }
}

export {BotModel}