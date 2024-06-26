import { Cell } from "./Cell.js";
import { Wall } from "./Wall.js";
import { window } from "../settings.js";
import { Weapon } from "../Weapon/Weapon.js";

class BattleGround {
    constructor(groundList, wallList, weaponSet, context) {
        this.context = context;
        this.cells = [];
        this.walls = [];
        this.weapons = [];

        for (let w = 0; w < weaponSet.length; w++) {
            var [name, x, y, battleType, rapidity, grouping, deviation, status, onGround, inHand] = weaponSet[w];
            this.weapons.push(new Weapon(name, x, y, battleType, rapidity, grouping, deviation, status, onGround, inHand, context));
        }

        for (let i = 0; i < groundList.length; i++) {
            var [x, y] = groundList[i];
            this.cells.push(new Cell(x, y, context));
        }


        for (let k = 0; k < wallList.length; k++){
            const [startX, startY, endX, endY] = wallList[k];
            this.walls.push(new Wall(startX, startY, endX, endY, context));
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
        this.context.fillRect(0, 0, window.w, window.h);
    }

    move(dx, dy) {
        this.walls.forEach(wall => {
            wall.move(dx, dy);
        });
    }

}

export {BattleGround}