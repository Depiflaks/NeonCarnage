import { BattleGround } from "../BattleGround/BattleGround.js";
import { PlayerController } from "../Player/PlayerController.js";


class EngineModel {
    constructor({cells, walls, weapons, ammunitions, bonuses}, player) {
        this.field = new BattleGround(cells, walls, weapons, ammunitions, bonuses);
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

export { EngineModel };