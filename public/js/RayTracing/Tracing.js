import { CELL, PLAYER, RAD } from "../CONST.js";
import { Ray } from "./Ray.js";

class Tracing {
    constructor(player, field) {
        this.player = player;
        this.field = field;
    }

    mapping(x, y) {
        return [Math.floor(x / CELL.w) * CELL.w, Math.floor(y / CELL.h) * CELL.h]
    }

    wallsIntersect(ray, walls, vertical) {
        let x, y
        for (let wall of walls) {
            [x, y] = [ray.x / CELL.w, ray.y / CELL.h];
            if (vertical) {
                if (x == wall.startIndX && wall.startIndY <= y && y <= wall.endIndY) {
                    return true;
                }
            } else {
                if (y == wall.startIndY && wall.startIndX <= x && x <= wall.endIndX) {
                    return true;
                }
            }
        }
        return false;
    }

    setActive(x, y, vertical) {
        //console.log(123);
        let indexX = Math.floor(x / CELL.w);
        let indexY = Math.floor(y / CELL.h);
        
        if (!(0 <= indexX && indexX <= this.field.w && 0 <= indexY && indexY <= this.field.h)) return;
        if (!this.field.cells[indexX][indexY]) return;
        this.field.cells[indexX][indexY].activeDirection = -1;
        this.field.cells[indexX][indexY].active = true;

        let deltaX = vertical ? -1 : 0;
        let deltaY = vertical ? 0 : -1;
        if (!(0 <= indexX + deltaX)) return;
        if (!(0 <= indexY + deltaY)) return;
        if (!this.field.cells[indexX + deltaX][indexY + deltaY]) return;
        this.field.cells[indexX + deltaX][indexY + deltaY].activeDirection = -1;
        this.field.cells[indexX + deltaX][indexY + deltaY].active = true;
    }

    updateViewRange() {
        let { x: px, y: py } = this.player.getPosition();
        const field = {
            x: this.field.x,
            y: this.field.y
        }
        px -= field.x;
        py -= field.y;
        const size = CELL.w;
        const angleStep = PLAYER.visualField.angleStep;
        const range = PLAYER.visualField.range;
        let delta;

        for (let angle = 0 * RAD; angle <= 360 * RAD; angle += angleStep) {
            const tg = Math.tan(angle);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            let [startX, startY] = this.mapping(px, py);
            startY += (sin < 0) ? size : 0;
            startX += (cos > 0) ? size : 0;

            const vertical = new Ray(
                size * ((cos > 0) ? 1 : -1),
                startX, 0, px, py
            );
            const horizontal = new Ray(
                size * ((sin < 0) ? 1 : -1),
                0, startY, px, py
            );
            for (let i = 0; i < 100; i++) {
                // считаем кординаты точки
                vertical.matchY(tg);
                horizontal.matchX(tg);
                vertical.matchDistant();
                horizontal.matchDistant();
                delta = vertical.distant - horizontal.distant;
                // проверка на выход из range
                horizontal.inRange &= horizontal.distant <= range;
                vertical.inRange &= vertical.distant <= range;
                // проверка на касание со стеной
                horizontal.isWall |= this.wallsIntersect(horizontal, this.field.horizontalWalls, false);
                vertical.isWall |= this.wallsIntersect(vertical, this.field.verticalWalls, true);
                const breakCondition = {
                    inRange: !vertical.inRange && !horizontal.inRange, // если оба луча вышли за область
                    isWall: vertical.isWall && horizontal.isWall, // если оба луча коснулись стены
                    horizontalWall: horizontal.isWall && delta > 0, // если горизонтальный луч коснулся стены
                    verticalWall: vertical.isWall && delta < 0 // если вертикальный луч коснулся стены
                }
                //console.log(breakCondition);
                if (Object.values(breakCondition).some(value => value)) break;
                // пускаем лучи, которые находятся в области, дальше и обрабатываем точки
                if (vertical.inRange && !vertical.isWall && delta < 0) {
                    this.setActive(vertical.x, vertical.y, true);
                    vertical.x += vertical.step;
                }
                if (horizontal.inRange && !horizontal.isWall && delta > 0) {
                    this.setActive(horizontal.x, horizontal.y, false);
                    horizontal.y += horizontal.step;
                }
                //break;
            }
        }
    }
}

export { Tracing }