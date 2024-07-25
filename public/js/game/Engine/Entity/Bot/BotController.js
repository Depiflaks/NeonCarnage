import { EnemyController } from "../Enemy/EnemyController.js";
import { BotModel } from "./BotModel.js"
import {WEAPON} from "../../../CONST.js";
import {Bullet} from "../../Weapon/Bullet/Bullet.js";
//import {RATE_OF_FIRE} from "../../../../../../server/CONST/GAME/ENTITY/BOT.js";

class BotController extends EnemyController {
    constructor(player) {
        super(player)
        this.model = new BotModel(player);

    }

    shot() {
        if (this.model.isRecharging) return;
        this.model.isRecharging = true;
        setTimeout(() => {this.model.isRecharging = false}, 700)
        const angle = this.getAngle();
        const x = this.getPosition().x + WEAPON.h/4.1 * Math.cos(angle);
        const y = this.getPosition().y + WEAPON.h/4.1 * Math.sin(angle);
        const deviation = 0.1;
        const angleDeviation = (Math.random() * 2 - 1) * deviation;
        const adjustedAngle = angle + angleDeviation;
        this.model.bullets.push(new Bullet({ x, y, angle: adjustedAngle }));
    }

    setShooting(value) {
        this.model.shooting = value;
    }

    getShooting() {
        return this.model.shooting;
    }

    getBotSkin() {
        return this.model.skin;
    }
}

export {BotController}