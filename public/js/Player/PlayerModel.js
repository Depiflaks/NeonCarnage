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