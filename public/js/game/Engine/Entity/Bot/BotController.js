import { EnemyController } from "../Enemy/EnemyController.js";
import { BotModel } from "./BotModel.js"

class BotController extends EnemyController {
    constructor(player) {
        super(player)
        this.model = new BotModel(player);

    }

    setShooting(value) {
        this.model.shooting = value;
    }

    getShooting() {
        return this.model.shooting;
    }

}

export {BotController}