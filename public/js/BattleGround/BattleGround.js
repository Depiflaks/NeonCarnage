import { Cell } from "./Cell.js";

class BattleGround {
    constructor(battleGround, ctx) {
        this.ctx = ctx;
        this.cells = [];
        for (let i = 0; i < battleGround.length; i++) {
            for (let j = 0; j < battleGround[i].length; j++) {
                if (battleGround[i][j] === '1') {
                    this.cells.push(new Cell(i, j, this.ctx));
                }
                
            }
        }
    }

    drawfield() {
        for (let cell of this.cells) {
            cell.draw();
        }
    }

}

export {BattleGround}