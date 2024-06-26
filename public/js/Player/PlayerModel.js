class PlayerModel extends Moveable {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alpha = 0;
        this.speedX = 0;
        this.speedY = 0;
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
