class Drawable {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.active = false;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    isActive() {
        return this.active ? true : false
    }
}

export { Drawable };