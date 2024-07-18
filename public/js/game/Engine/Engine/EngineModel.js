import { Field } from "../Field/Field.js";
import { PlayerController } from "../Entity/Player/PlayerController.js";


class EngineModel {
    constructor({obj: {cells, walls, weapons, ammunitions, bonuses}, player: player}) {
        this.field = new Field(cells, walls, weapons, ammunitions, bonuses, player.spawnPoints);
        this.player = new PlayerController(this.field.getSpawnPoint(), player.skinId, player.nickName);
        this.enemies = [];
        this.playerList = {};
        this.leaderBoard = false;
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

    getPlayerList() {
        return this.playerList;
    }

    updateShake() {
        if (this.player.model.shakeDuration > 0) {
            this.player.model.shakeDuration -= 1;
        } else {
            this.player.model.shaking = false;
        }
    }

    isShaking() {
        return this.player.model.shaking;
    }
}

export { EngineModel };