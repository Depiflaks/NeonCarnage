import { BattleGround } from "../BattleGround/BattleGround.js";
import { PlayerController } from "../Player/PlayerController.js";


class EngineModel {
    constructor({cellsList, wallsList, weaponList, ammunitionSet, bonusSet}, player) {
        this.field = new BattleGround(cellsList, wallsList, weaponList, ammunitionSet, bonusSet);
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