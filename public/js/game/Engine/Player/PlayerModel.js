import { EntityModel } from "../Entity/EntityModel.js";
import { ENTITY } from "../../CONST.js";
import { Trajectory } from "../Weapon/Trajectory.js";

class PlayerModel extends EntityModel {
    constructor({ x, y }) {
        super({x, y});
        this.speedX = 0;
        this.speedY = 0;
        this.isStriking = false;
        this.stacked = false;
        this.keyPressed = {
            w: 0,
            a: 0,
            s: 0,
            d: 0,
            e: 0,
        };
        this.bullets = [];
        this.health = PLAYER.health;
        this.maxHealth = PLAYER.maxHealth;
    }

    updatePosition() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.weapon !== null) {
            this.weapon.model.x = this.x;
            this.weapon.model.y = this.y;
        }
    }

    checkY(obj) {
        this.y += this.speedY;
        if (this.isIntersect(obj)) {
            this.y -= this.speedY;
            this.speedY = 0;
        } else {
            this.y -= this.speedY;
        }
    }

    checkX(obj) {
        this.x += this.speedX;
        if (this.isIntersect(obj)) {
            this.x -= this.speedX;
            this.speedX = 0;
        } else {
            this.x -= this.speedX;
        }
    }

    setSpeed(direction, value) {
        if (direction === 'x') {
            this.speedX = value;
        } else if (direction === 'y') {
            this.speedY = value;
        }
    }

    getSpeed() {
        return { speedX: this.speedX, speedY: this.speedY };
    }

    setKeyPressed(key, value) {
        this.keyPressed[key] = value;
    }

    getKeyPressed() {
        return this.keyPressed;
    }

    move(dx, dy) {
        super.move(dx, dy);
        this.bullets.forEach(bullet => bullet.move(dx, dy));
    }

}

export { PlayerModel };