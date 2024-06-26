class Drawable {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export { Drawable };