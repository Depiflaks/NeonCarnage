import { Trajectory } from "../Weapon/Trajectory.js";

class EntityController {
    constructor() {}

    setAngle(angle) {
        this.model.angle = angle;
    }

    getAngle() {
        return this.model.angle;
    }

    getWeapon() {
        return this.model.weapon;
    }

    setWeapon(weapon) {
        this.model.weapon = weapon;
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
}

export {EntityController}