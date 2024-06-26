import { Cell } from "./Cell.js";
import { VerticalWall} from "./VerticalWall.js";
import { HorisontalWall} from "./HorisontalWall.js";
import { WINDOW } from "../settings.js";
import { Weapon } from "../Weapon/Weapon.js";

class BattleGround {
    constructor(groundList, wallList, weaponSet, context) {
        this.context = context;
        this.cells = [];
        this.walls = [];
        this.weapons = [];

        weaponSet.map(
            weap => {
                this.weapons.push(new Weapon(weap, context));
            }
        );

        groundList.map(
            cell => {
                const [x, y] = cell;
                this.cells.push(new Cell(x, y, context)); 
            }
        );

        wallList.map(
            wall => {
                const [startX, startY, endX, endY] = wall;
                if (this.startX === this.endX) {
                    this.walls.push(new VerticalWall(startX, startY, endX, endY, context));
                } else if (this.startY === this.endY) {
                        this.walls.push(new HorisontalWall(startX, startY, endX, endY, context));
                    }
                } 
        )

    }

    drawGround() {
        this.cells.map(cell => cell.draw());
    }

    drawWalls() {
        this.walls.map(wall => wall.draw());
    }

    drawWeapons(){
        this.weapons.map(weap => weap.draw());
    }

    clearFrame() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, WINDOW.w, WINDOW.h);
    }


    move(dx, dy) {
        this.cells.map(cell => cell.move(dx, dy));
        this.walls.map(wall => wall.move(dx, dy));
        this.weapons.map(weapon => weapon.move(dx, dy));
    }
}

export { BattleGround } 