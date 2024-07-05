import { PLAYER } from "../../CONST.js";
import { Moveable } from "../Interface/Moveable.js";

class EnemyModel extends Moveable {
    constructor({ x, y, angle }) {
        super(x, y, PLAYER.w, PLAYER.h, PLAYER.radius);
        this.factX = 0;
        this.factY = 0;
        this.weapon = null;
        this.angle = angle;
        this.trajectory = null;
    }
}

export {EnemyModel}