import { EnemyController } from "../Enemy/EnemyController.js";
import { BotModel } from "./BotModel.js"

class BotController extends EnemyController {
    constructor(player) {
        super(player)
        console.log('che')
        this.model = new BotModel(player);

    }
}

export {BotController}