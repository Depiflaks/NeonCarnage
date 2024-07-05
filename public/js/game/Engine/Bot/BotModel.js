import { ENTITY } from "../../CONST.js";
import { EnemyModel } from "../Enemy/EnemyModel.js";

class BotModel extends EnemyModel {
    constructor({ x, y, angle }) {
        super({ x, y, angle });
    }
}

export {BotModel}