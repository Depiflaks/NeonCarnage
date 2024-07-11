import { WEAPON_STATE } from "../../CONST.js";
import { Trajectory } from "../Weapon/Trajectory.js";
import { SkinModel } from "./Skin/SkinModel.js";

class EntityController {
    constructor() {}

    getPosition() {
        return { x: this.model.x, y: this.model.y };
    }

    getHealth() {
        return this.model.health;
    }

    getMaxHealth() {
        return this.model.maxHealth;
    }

    isAlive() {
        return this.model.isAlive;
    }

    die() {
        if(this.getWeapon()) this.dropWeapon();
    }

    setAlive(value) {
        this.model.isAlive = value;
    }

    setHealth(value) {
        this.model.health = value;
    }

    setAngle(angle) {
        this.model.angle = angle;
    }

    getAngle() {
        return this.model.angle;
    }

    getSkinId() {
        return this.model.skinId;
    }

    getWeapon() {
        return this.model.weapon;
    }

    setWeapon(weapon) {
        this.model.weapon = weapon;
        if (weapon)
        this.setWeaponId(weapon ? weapon.getId() : null);
    }

    getWeaponId() {
        return this.model.weaponId;
    }

    setWeaponId(id) {
        this.model.weaponId = id;
    }

    createTrajectory() {
        this.model.trajectory = new Trajectory(this.model.x, this.model.y, this.model.angle);
    }

    removeTrajectory() {
        this.model.trajectory = null;
    }

    getTrajectory() {
        return this.model.trajectory;
    }

    isActive() {
        return this.model.active
    }

    getBullets() {
        return this.model.bullets;
    }

    setBullets(bullets) {
        this.model.bullets = bullets;
    }

    dropWeapon() {
        this.getWeapon().unsetPlayer(this.model);
        this.getWeapon().setStatus(WEAPON_STATE.onTheGround);
        clearInterval(this.getWeapon().getShootingInterval());
        this.getWeapon().setShootingInterval(null);
        this.setWeapon(null);
        this.setWeaponId(null);
    }

    getSkin() {
        return this.model.skin;
    }

    setSkin(skinId) {
        this.model.skinId = skinId;
        this.model.skin = new SkinModel(skinId);
    }
}

export {EntityController}