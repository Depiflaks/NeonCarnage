import { ENTITY } from "../../CONST.js";
import { Moveable } from "../Interface/Moveable.js";

class EntityModel extends Moveable {
    constructor({ x, y }) {
        super(x, y, ENTITY.w, ENTITY.h, ENTITY.radius);
        this.weapon = null;
        this.weaponId = 0;
        this.trajectory = null;
        this.health = ENTITY.health;
        this.maxHealth = ENTITY.maxHealth;
        this.bullets = [];
        this.isAlive = true;
    }
}

export {EntityModel}