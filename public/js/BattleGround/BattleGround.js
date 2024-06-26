import { Cell } from "./Cell.js";
import { Wall } from "./Wall.js";
import { window } from "../settings.js";

class BattleGround {
    constructor(groundList, wallList, context) {
        this.context = context;
        this.cells = [];
        this.walls = [];
        for (let i = 0; i < groundList.length; i++) {
            for (let j = 0; j < groundList[i].length; j++) {
                if (groundList[i][j] === '1') {
                    this.cells.push(new Cell(i, j, this.context));
                }
            }
        }

        for (let k = 0; k < wallList.length; k++){
            const startX = wallList[k][0];
            const startY = wallList[k][1];
            const endX = wallList[k][2];
            const endY = wallList[k][3];
            //console.log(startX, startY, endX, endY);
            this.walls.push(new Wall(startX, startY, endX, endY, context));
        }

    }

    drawGround() {
        for (let cell of this.cells) {
            cell.draw();
        }
    }

    drawWalls() {
        this.walls.forEach(wall => {
            wall.draw();
        });
    }

    clearFrame() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, window.w, window.h);
    }

    move(dx, dy) {
        for (let cell of this.cells) {
            cell.move(dx, dy);
        }
        for (let wall of this.walls) {
            //console.log(wall);
            wall.move(dx, dy);
        }
    }
}

export { BattleGround } 