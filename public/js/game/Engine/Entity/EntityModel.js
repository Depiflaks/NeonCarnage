import { ENTITY } from "../../CONST.js";
import { Moveable } from "../Interface/Moveable.js";
import { SkinModel } from "./Skin/SkinModel.js";

class EntityModel extends Moveable {
    constructor({ x, y, skinId }) {
        super(x, y, ENTITY.w, ENTITY.h, ENTITY.radius);
        this.weapon = null;
        this.weaponId = 0;
        this.trajectory = null;
        this.health = ENTITY.health;
        this.maxHealth = ENTITY.maxHealth;
        this.bullets = [];
        this.isAlive = true;
        this.skinId = skinId;
        this.skin = new SkinModel({skinId});
        
    }
}

export {EntityModel}