import { CELL } from "../../CONST.js";
import { Trajectory } from "../Weapon/Trajectory.js";

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
}

export {EntityController}