class Ray  {
    constructor(step, x, y, px, py) {
        this.step = step;
        this.x = x;
        this.y = y;
        this.distant = 0;
        this.inRange = true;
        this.isWall = false;
        this.px = px;
        this.py = py;
    }

    matchX(tg) {
        this.x = this.px - (this.y - this.py) / tg
    }

    matchY(tg) {
        this.y = this.py - (this.x - this.px) * tg;
    }

    matchDistant() {
        this.distant = this.getDistant(this.x - this.px, this.y - this.py)
    }

    getDistant(x, y) {
        return Math.sqrt(x ** 2 + y ** 2);
    }
}

export {Ray};