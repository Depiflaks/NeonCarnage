import { ENTITY } from "../../CONST.js";
import { Moveable } from "../Interface/Moveable.js";
import { Skin } from "./Skin/Skin.js";

class EntityModel extends Moveable {
    constructor({ x, y, skinId, nickName}) {
        super(x, y, ENTITY.w, ENTITY.h, ENTITY.radius);
        this.weapon = null;
        this.weaponId = null;
        this.meleeStrike = null;
        this.health = ENTITY.health;
        this.maxHealth = ENTITY.maxHealth;
        this.bullets = [];
        this.isAlive = true;
        this.skinId = skinId;
        this.skin = new Skin({skinId});
        
        this.nickname = nickName;
    }
}

export {EntityModel}