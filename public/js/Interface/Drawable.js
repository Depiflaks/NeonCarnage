class Drawable {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    /**
     * 
     * @param {number} dx перемещение по оси х
     * @param {number} dy перемещение по оси у
     */
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export { Drawable };