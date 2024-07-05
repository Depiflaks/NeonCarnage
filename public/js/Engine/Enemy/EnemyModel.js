import { ENTITY } from "../../CONST.js";
import { EntityModel } from "../Entity/EntityModel.js";

class EnemyModel extends EntityModel {
    constructor({ x, y, angle }) {
        super({x, y});
        this.factX = 0;
        this.factY = 0;
        this.angle = angle;
    }
}

export {EnemyModel}