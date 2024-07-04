import { ENEMY } from "../CONST.js";
import { EnemyModel } from "./EnemyModel.js"
import { EnemyView } from "./EnemyView.js";

class EnemyController {
    constructor(player) {
        this.model = new EnemyModel(player);
    }

    setPosition({x, y}) {
        this.model.factX = x;
        this.model.factY = y;
    }

    getPosition() {
        return {x: this.model.factX, y: this.model.factY};
    }

    setWeapon(weapon) {
        this.model.weapon = weapon;
    }

    getWeapon() {
        return this.model.weapon;
    }

    setAngle(angle) {
        this.model.angle = angle;
    }

    getAngle() {
        return this.model.angle;
    }

    update() {
        const dx = this.model.factX - this.model.x;
        const dy = this.model.factY - this.model.y;
        this.model.move(dx / ENEMY.period, dy / ENEMY.period);
    }

    move(dx, dy) {
        this.model.move(dx, dy);
        this.model.factX += dx;
        this.model.factY += dy;
    }
}

export {EnemyController}