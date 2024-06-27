import { Moveable } from "../Interface/Moveable.js";
import { PLAYER_SET } from "../settings.js";

class PlayerModel extends Moveable {
    constructor({x, y}) {
        super(x, y, PLAYER_SET.w, PLAYER_SET.h, PLAYER_SET.radius)
        this.keyPressed = {
            w: 0,
            a: 0,
            s: 0,
            d: 0,
        };
    }

    updatePosition() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    stepBack() {
        this.x -= this.speedX;
        this.y -= this.speedY;
    }

    changeDirection() {
        this.speedX *= -1;
        this.speedY *= -1;
    }

    resetSpeed() {
        this.speedX = 0;
        this.speedY = 0;
    }

    setSpeed(direction, value) {
        if (direction === 'x') {
            this.speedX = value;
        } else if (direction === 'y') {
            this.speedY = value;
        }
    }

    setAlpha(value) {
        this.alpha = value;
    }

    setKeyPressed(key, value) {
        this.keyPressed[key] = value;
    }

    getAlpha() {
        return this.alpha;
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
}

export { PlayerModel };
