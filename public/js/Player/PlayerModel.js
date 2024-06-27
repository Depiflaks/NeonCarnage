import { Moveable } from "../Interface/Moveable.js";
import { PLAYER_SET, WEAPON_STATE } from "../settings.js";

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

    /**
     * 
     * @param {string} direction направление скорости
     * @param {number} value  значение для скорости
     */
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

    /**
     * 
     * @param {string} key буква текущей клавиши 
     * @param {number} value состояние клавиши 0 - отпущена  1 - нажата 
     */
    setKeyPressed(key, value) {
        this.keyPressed[key] = value;
    }

    getAngle() {
        return this.angle;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    getKeyPressed() {
        return this.keyPressed;
    }

    getSpeed() {
        return { speedX: this.speedX, speedY: this.speedY };
    }

    /**
     * 
     * @param {object} weapon WeaponController вся модель mvc оружия
     */
    setWeapon(weapon) {
        this.weapon = weapon; 
    }

    dropWeapon() {
        this.weapon.unsetPlayer(this);
        this.weapon.model.status = WEAPON_STATE.onTheGround;
        this.weapon = null;
    }
}

export { PlayerModel };