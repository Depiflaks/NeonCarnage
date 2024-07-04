import { BattleGround } from "../BattleGround/BattleGround.js";
import { PlayerController } from "../Player/PlayerController.js";


class GameModel {
    constructor({cellsList, wallsList, weaponList}, player) {
        this.field = new BattleGround(cellsList, wallsList, weaponList);
        this.player = new PlayerController(player);
        this.enemies = [];
    }

    getField() {
        return this.field;
    }

    getEnemies() {
        return this.enemies;
    }

    getPlayer() {
        return this.player;
    }
}

export { GameModel };