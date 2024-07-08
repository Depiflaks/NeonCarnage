import { BattleGround } from "../BattleGround/BattleGround.js";
import { PlayerController } from "../Player/PlayerController.js";


class EngineModel {
    constructor({obj: {cells, walls, weapons, ammunitions, bonuses}, player: player}) {
        this.field = new BattleGround(cells, walls, weapons, ammunitions, bonuses);
        this.player = new PlayerController(player);
        this.enemies = [];
        this.shaking = false;
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