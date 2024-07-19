import { CELL, ENEMY } from "../../../CONST.js";
import { EntityController } from "../EntityController.js";
import { EnemyModel } from "./EnemyModel.js"

class EnemyController extends EntityController{
    constructor(player) {
        super();
        this.model = new EnemyModel(player);
    }

    checkActive(field) {
        const {x, y} = this.getPosition();
        const indexX = Math.floor((x - field.x) / CELL.w);
        const indexY = Math.floor((y - field.y) / CELL.h);
        //console.log(indexX, indexY);
        if (indexX && indexY && field.cells[indexX][indexY]) this.model.active = field.cells[indexX][indexY].active;
    }

    setPosition({x, y}) {
        this.model.factX = x;
        this.model.factY = y;
    }

    // getPosition() {
    //     //console.log(123);
    //     return {x: this.model.factX, y: this.model.factY};
    // }

    update() {
        const dx = this.model.factX - this.model.x;
        const dy = this.model.factY - this.model.y;
        //console.log(dx / ENEMY.period, dy / ENEMY.period);

        if (!this.getMeleeStrike()) return;
        if (this.getMeleeStrike().isAnimating) {
            this.getMeleeStrike().update(this.getPosition(), this.getAngle(), this.getIsStriking());
        } else {
            this.removeMeleeStrike();
        }
        this.model.move(dx / ENEMY.period, dy / ENEMY.period);
    }

    move(dx, dy) {
        this.model.move(dx, dy); 
        this.model.factX += dx;
        this.model.factY += dy;
    }

    setLastHitTime(time) {
        this.model.lastHitTime = time;
    }

    getLastHitTime() {
        return this.model.lastHitTime;
    }
}

export {EnemyController}