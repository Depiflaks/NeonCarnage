import { Cell } from "./Cell.js";
import { VerticalWall} from "./VerticalWall.js";
import { HorisontalWall} from "./HorisontalWall.js";
import { WINDOW } from "../settings.js";
import { Weapon } from "../Weapon/Weapon.js";

class BattleGround {
    constructor(groundList, wallList, weaponSet) {
        this.cells = [];
        this.walls = [];
        this.weapons = [];

        weaponSet.map(
            weapon => {
                this.weapons.push(new Weapon(weapon));
            }
        );

        groundList.map(
            cell => {
                const [x, y] = cell;
                this.cells.push(new Cell(x, y)); 
            }
        );

        wallList.map(
            wall => {
                const [startX, startY, endX, endY] = wall;
                if (startX === endX) {
                    this.walls.push(new VerticalWall(startX, startY, endX, endY));
                } else if (startY === endY){
                        this.walls.push(new HorisontalWall(startX, startY, endX, endY));
                    }
                } 
        )

    };

    drawGround(context) {
        this.cells.map(cell => cell.draw(context));
    }

    drawWalls(context) {
        this.walls.map(wall => wall.draw(context));
    }

    drawWeapons(player, context){
        this.weapons.map(weapon => weapon.draw(player, context));
    }

    clearFrame(context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, WINDOW.w, WINDOW.h);
    }


    move(dx, dy) {
        this.cells.map(cell => cell.move(dx, dy));
        this.walls.map(wall => wall.move(dx, dy));
        this.weapons.map(weapon => weapon.move(dx, dy));
    }
}

export { BattleGround } 