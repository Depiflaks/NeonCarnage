import { Cell } from "./Cell.js";
import { VerticalWall} from "./VerticalWall.js";
import { HorisontalWall} from "./HorisontalWall.js";
import { CELL_SET, WINDOW } from "../settings.js";
import { Weapon } from "../Weapon/Weapon.js";
import { Drawable } from "../Interface/Drawable.js";

class BattleGround extends Drawable {
    constructor(groundList, wallList, weaponSet) {

        let maxX = 0;
        let maxY = 0;
        groundList.map(
            ([x, y]) => {
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
            }
        );

        super(0, 0, maxX, maxY);
        this.cells = [];
        this.verticalWalls = [];
        this.horisontalWalls = [];
        this.weapons = [];

        

        this.cells = Array.from({ length: maxX + 1 }, () => Array(maxY + 1).fill(null));

        weaponSet.map(
            weapon => {
                this.weapons.push(new Weapon(weapon));
            }
        );

        groundList.map(
            cell => {
                const [x, y] = cell;
                this.cells[x][y] = new Cell(y, x); 
            }
        );

        wallList.map(
            wall => {
                const [startX, startY, endX, endY] = wall;
                if (startX === endX) {
                    this.verticalWalls.push(new VerticalWall(startX, startY, endX, endY));
                } else if (startY === endY) {
                    this.horisontalWalls.push(new HorisontalWall(startX, startY, endX, endY));
                }
            } 
        )
    };

    drawGround(context) {
        this.cells.map(row => row.map(cell => cell.draw(context)));
    }

    drawWalls(context) {
        this.horisontalWalls.map(wall => wall.draw(context));
        this.verticalWalls.map(wall => wall.draw(context));
    }

    drawWeapons(player, context) {
        let indexX, indexY
        
        this.weapons.map(weapon => {
            indexX = Math.floor((weapon.x - this.x) / CELL_SET.w);
            indexY = Math.floor((weapon.y - this.y) / CELL_SET.h);
            //console.log(indexX, indexY);
            if (this.cells[indexX][indexY].active) weapon.draw(player, context);
        });
    }

    clearFrame(context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, WINDOW.w, WINDOW.h);
    }

    hideCells() {
        this.cells.map(row => row.map(cell => cell.active = false));
    }

    move(dx, dy) {
        super.move(dx, dy);
        this.cells.map(row => row.map(cell => cell.move(dx, dy)));
        this.verticalWalls.map(wall => wall.move(dx, dy));
        this.horisontalWalls.map(wall => wall.move(dx, dy));
        this.weapons.map(weapon => weapon.move(dx, dy));
    }
}

export { BattleGround } 