import { Cell } from "../BattleGround/Cell.js";
import { PlayerView } from "../Player/PlayerView.js";
import { WINDOW, RAD, PLAYER_SET, CELL_SET } from "../settings.js";


class GameView {
    constructor(canvas) {
        this.canvas = canvas
        canvas.width = WINDOW.w;
        canvas.height = WINDOW.h;
        this.context = canvas.getContext("2d");
    }

    drawFrame(field, player) {
        field.drawGround(this.context);
        field.drawWeapons(player, this.context);
        player.view.draw(
            player.model.getPosition(), 
            player.model.getAngle()
        );
        field.drawWalls(this.context);
    }

    updateFrame(field, player) {
        field.clearFrame(this.context);
        this.drawFrame(field, player);
        field.hideCells();
        this.drawViewingRange(player, field)
        
    }

    drawLine(x1, y1, x2, y2, color, field) {
        this.context.lineWidth = 1;
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(x1 + field.x, y1 + field.y);
        this.context.lineTo(x2 + field.x, y2 + field.y);
        this.context.stroke();
        //console.log(123, x1, y1, x2, y2)
    }

    drawCircle(x, y, radius, color, field) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x + field.x, y + field.y, radius, 0, Math.PI * 2, true);
        this.context.fill();
    }

    strokeCircle(x, y, radius, color, field) {
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.arc(x + field.x, y + field.y, radius, 0, Math.PI * 2, true);
        this.context.stroke();
    }

    mapping(x, y) {
        return [Math.floor(x / CELL_SET.w) * CELL_SET.w, Math.floor(y / CELL_SET.h) * CELL_SET.h]
    }

    distant(x, y) {
        return Math.sqrt(x ** 2 + y ** 2);
    }

    wallsIntersect(ray, walls, vertical) {
        let x, y
        for (let wall of walls) {
            [x, y] = [ray.x / CELL_SET.w, ray.y / CELL_SET.h];
            if (vertical) {
                if (x == wall.startIndX && wall.startIndY <= y && y <= wall.endIndY) {
                    //wall.active = true;
                    return true;
                }
            } else {
                if (y == wall.startIndY && wall.startIndX <= x && x <= wall.endIndX) {
                    //wall.active = true;
                    return true;
                }
            }
        }
        return false;
    }

    setActive(x, y, field, vertical) {
        let indexX = Math.floor(x / CELL_SET.w);
        let indexY = Math.floor(y / CELL_SET.h);
        
        if (!(0 <= indexX && indexX <= field.w && 0 <= indexY && indexY <= field.h)) return;
        if (!field.cells[indexX][indexY]) return;
        field.cells[indexX][indexY].active = true;

        let deltaX = vertical ? -1 : 0;
        let deltaY = vertical ? 0 : -1;
        if (!(0 <= indexX + deltaX)) return;
        if (!(0 <= indexY + deltaY)) return;
        if (!field.cells[indexX + deltaX][indexY + deltaY]) return;
        field.cells[indexX + deltaX][indexY + deltaY].active = true;
    }

    drawViewingRange(player, field) {
        let { x: px, y: py } = player.model.getPosition();

        px -= field.x;
        py -= field.y;
        const size = CELL_SET.w;
        const angleStep = PLAYER_SET.visualField.angleStep;
        const range = PLAYER_SET.visualField.range;
        let delta;
        // vertical -> x
        // horisontal -> y

        for (let angle = 0 * RAD; angle <= 360 * RAD; angle += angleStep) {
            const tg = Math.tan(angle);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            let [startX, startY] = this.mapping(px, py);
            startY += (sin < 0) ? size : 0;
            startX += (cos > 0) ? size : 0;

            const vertical = {
                step: size * ((cos > 0) ? 1 : -1),
                x: startX,
                y: 0,
                distant: 0,
                inRange: true,
                isWall: false,
            }

            const horisontal = {
                step: size * ((sin < 0) ? 1 : -1),
                x: 0,
                y: startY,
                distant: 0,
                inRange: true,
                isWall: false,
            }
            while (true) {
                // считаем кординаты точки
                vertical.y = py - (vertical.x - px) * tg;
                horisontal.x = px - (horisontal.y - py) / tg;
                vertical.distant = this.distant(vertical.x - px, vertical.y - py);
                horisontal.distant = this.distant(horisontal.x - px, horisontal.y - py);
                delta = vertical.distant - horisontal.distant;
                // проверка на выход из range
                if (horisontal.distant > range) {
                    horisontal.inRange = false;
                };
                if (vertical.distant > range) {
                    vertical.inRange = false;
                };
                // проверка на касание со стеной
                if (this.wallsIntersect(horisontal, field.horisontalWalls, false)) {
                    horisontal.isWall = true;
                }
                if (this.wallsIntersect(vertical, field.verticalWalls, true)) {
                    vertical.isWall = true;
                }
                // если оба луча вышли за область, заканчиваем цикл
                if (!vertical.inRange && !horisontal.inRange) {
                    break;
                }
                // если оба луча коснулись стены, заканчиваем цикл
                if (vertical.isWall && horisontal.isWall) {
                    break;
                }
                // если горизонтальный луч коснулся стены, проверяем длину лучей
                if (horisontal.isWall && delta > 0) {
                    break;
                }
                // если вертикальный луч коснулся стены, проверяем длину лучей
                if (vertical.isWall && delta < 0) {
                    break;
                }
                // пускаем лучи, которые находятся в области, дальше и обрабатываем точки
                if (vertical.inRange && !vertical.isWall && delta < 0) {
                    this.setActive(vertical.x, vertical.y, field, true);
                    //this.drawCircle(vertical.x, vertical.y, 5, "blue", field);
                    vertical.x += vertical.step;
                }
                if (horisontal.inRange && !horisontal.isWall && delta > 0) {
                    this.setActive(horisontal.x, horisontal.y, field, false);
                   // this.drawCircle(horisontal.x, horisontal.y, 5, "red", field);
                    horisontal.y += horisontal.step;
                }
            }
            //this.strokeCircle(px, py, range, "red", field);
        }

        //     for (let rayX = startX; (rayX - px) ** 2 + ((rayX - px) * tg) ** 2 <= PLAYER_SET.visualField.range ** 2; rayX += stepX) {
        //         rayY = (rayX - px) * tg + py;
        //         indexX = Math.floor(rayX / CELL_SET.w);
        //         indexY = Math.floor(rayY / CELL_SET.h);
        //         if (!(0 <= indexX && indexX <= field.w && 0 <= indexY && indexY <= field.h)) break;
        //         if (!field.cells[indexX][indexY]) break;
        //         field.cells[indexX][indexY].active = true;
        //         if (!(0 <= indexX - 1)) break;
        //         if (!field.cells[indexX - 1][indexY]) break;
        //         field.cells[indexX - 1][indexY].active = true;
        //         this.drawCircle(rayX + field.x, rayY + field.y, 5);
        //     }
            
        //     for (let rayY = startY; ((rayY - py) / tg) ** 2 + (rayY - py) ** 2 <= PLAYER_SET.visualField.range ** 2; rayY += stepY) {
        //         rayX = (rayY - py) / tg + px;
        //         indexX = Math.floor(rayX / CELL_SET.w);
        //         indexY = Math.floor(rayY / CELL_SET.h);
        //         if (!(0 <= indexX && indexX <= field.w && 0 <= indexY && indexY <= field.h)) break;
        //         if (!field.cells[indexX][indexY]) break;
        //         field.cells[indexX][indexY].active = true;
        //         if (!(0 <= indexY - 1)) break;
        //         if (!field.cells[indexX][indexY - 1]) break;
        //         field.cells[indexX][indexY - 1].active = true;
        //         this.drawCircle(rayX + field.x, rayY + field.y, 5);
        //     }
        // }
    }
}


export { GameView };