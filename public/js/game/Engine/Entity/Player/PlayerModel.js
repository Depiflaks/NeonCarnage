import { EntityModel } from "../EntityModel.js";

class PlayerModel extends EntityModel {
    constructor({ x, y }, skinId, nickName) {
        super({x, y, skinId, nickName});
        this.active = true;
        this.speedX = 0;
        this.speedY = 0;
        this.isStriking = false;
        this.isShooting = false;
        this.isRecharging = false;
        this.stacked = false;
        this.keyPressed = {
            w: 0,
            a: 0,
            s: 0,
            d: 0,
            e: 0,
        };
        this.ghost = false;
        this.change = {
            damage: {

            },
            botDamage: {

            },
            amount: 0,
            weapon: {
                id: null,
                state: null,
            },
            ammunitions: [],
            aidKits: [],
        };
        this.isReborning = false;
        this.visibleBots = new Set(); // добавлять бота которого видит, и удалять если тот пропадает из видимости
    }

    updatePosition() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.weapon) {
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