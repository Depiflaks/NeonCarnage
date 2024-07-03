import { Moveable } from "../Interface/Moveable.js";
import { PLAYER } from "../CONST.js";
import { Trajectory } from "../Weapon/Trajectory.js";

class PlayerModel extends Moveable {
    constructor({ x, y }) {
        super(x, y, PLAYER.w, PLAYER.h, PLAYER.radius);
        this.weapon = null;
        this.trajectory = null;
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
        if (this.isIntersect(obj)) this.speedY = 0;
        this.y -= this.speedY;
    }

    checkX(obj) {
        this.x += this.speedX;
        if (this.isIntersect(obj)) this.speedX = 0;
        this.x -= this.speedX;
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

    getHealth() {
        return this.health;
    }

    move(dx, dy) {
        super.move(dx, dy);
        this.bullets.forEach(bullet => bullet.move(dx, dy));
    }

}

export { PlayerModel };