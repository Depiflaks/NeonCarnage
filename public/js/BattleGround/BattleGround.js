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

        for (let w = 0; w < weaponSet.length; w++) {
            const [name, x, y, battleType, rapidity, grouping, deviation, status, onGround, inHand] = weaponSet[w];
            this.weapons.push(new Weapon(name, x, y, battleType, rapidity, grouping, deviation, status, onGround, inHand, context));
        }

        for (let i = 0; i < groundList.length; i++) {
            const [x, y] = groundList[i];
            this.cells.push(new Cell(x, y, context));
        }

        for (let k = 0; k < wallList.length; k++){
            const [startX, startY, endX, endY] = wallList[k];
            if (this.startX === this.endX) {
                this.walls.push(new VerticalWall(startX, startY, endX, endY, context));
            } else if (this.startY === this.endY) {
                    this.walls.push(new HorisontalWall(startX, startY, endX, endY, context));
                }
            } 

    }

    drawGround() {
        this.cells.forEach(cell => {
            cell.draw();
        });
    }

    drawWalls() {
        this.walls.forEach(wall => {
            wall.draw();
        });
    }

    drawWeapons(){
        this.weapons.forEach(weap => {
            weap.draw();
        })
    }

    clearFrame() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, WINDOW.w, WINDOW.h);
    }


    move(dx, dy) {
        for (let cell of this.cells) {
            cell.move(dx, dy);
        }
        for (let wall of this.walls) {
            wall.move(dx, dy);
        }
        for (let weapon of this.weapons) {
            //console.log(wall);
            weapon.move(dx, dy);
        }
    }
}

export { BattleGround } 