import { ENEMY } from "../../CONST.js";
import { EnemyController } from "../Enemy/EnemyController.js";
import { BotModel } from "./BotModel.js"

class BotController extends EnemyController{
    constructor(player) {
        this.model = new BotModel(player);
    }
}

export {BotController}