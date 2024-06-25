import { Cell } from "./Cell.js";
import { Wall } from "./Wall.js";
import { window } from "../settings.js";

class BattleGround {
    constructor(groundList, wallList, canvasContext) {
        this.canvasContext = canvasContext;
        this.cells = [];
        this.walls = [];
        for (let i = 0; i < groundList.length; i++) {
            for (let j = 0; j < groundList[i].length; j++) {
                if (groundList[i][j] === '1') {
                    this.cells.push(new Cell(i, j, this.canvasContext));
                }
                
            }
        }

        for (let k = 0; k < wallList.length; k++){
            const startX = wallList[k][0];
            const startY = wallList[k][1];
            const endX = wallList[k][2];
            const endY = wallList[k][3];
            console.log(startX, startY, endX, endY);
            this.walls.push(new Wall(startX, startY, endX, endY, canvasContext));
        }

    }

    drawfield() {
        for (let cell of this.cells) {
            cell.draw();
        }
    }

    drawwalls() {
        this.walls.forEach(wall => {
            wall.drawWall();
        });
    }

    clearFrame() {
        this.canvasContext.clearRect(0, 0, window.w, window.h);
    }

}

export {BattleGround}