import { Moveable } from "../Interface/Moveable.js";
import { PLAYER_SET } from "../settings.js";

class PlayerModel extends Moveable {
    constructor({x, y}) {
        super(x, y, PLAYER_SET.w, PLAYER_SET.h, PLAYER_SET.radius);
        this.weapon = null;
        this.keyPressed = {
            w: 0,
            a: 0,
            s: 0,
            d: 0,
            e: 0,
        };
        this.bullets = [];
    }

    updatePosition() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    updatePositionY() {
        this.y += this.speedY;
    }

    updatePositionX() {
        this.x += this.speedX;
    }

    stepBackY() {
        this.y -= this.speedY;
    }

    stepBackX() {
        this.x -= this.speedX;
    }

    resetSpeedY() {
        this.speedY = 0;
    }

    resetSpeedX() {
        this.speedX = 0;
    }

    setSpeed(direction, value) {
        if (direction === 'x') {
            this.speedX = value;
        } else if (direction === 'y') {
            this.speedY = value;
        }
    }

    setAngle(value) {
        this.angle = value;
    }

    setKeyPressed(key, value) {
        this.keyPressed[key] = value;
    }

    getAngle() {
        return this.angle;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    getBullets() {
        return this.bullets;
    }

    getKeyPressed() {
        return this.keyPressed;
    }

    getSpeed() {
        return { speedX: this.speedX, speedY: this.speedY };
    }

    setWeapon(weapon) {
        this.weapon = weapon; 
    }

    move(dx, dy) {
        super.move(dx, dy);
        this.bullets.map(
            bullet => {
                bullet.move(dx, dy);
            }
        );
    }
}

export { PlayerModel };