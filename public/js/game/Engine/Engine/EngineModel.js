import { BattleGround } from "../BattleGround/BattleGround.js";
import { PlayerController } from "../Player/PlayerController.js";


class EngineModel {
    constructor({obj: {cells, walls, weapons, ammunitions, bonuses}, player: player}) {
        this.field = new BattleGround(cells, walls, weapons, ammunitions, bonuses, player.spawnPoints);
        this.player = new PlayerController(this.field.getSpawnPoint(), player.skinId, player.nickName);
        this.enemies = [];
        this.list = {
            '123': 4,
            'Smmm': 5,
            'Liuba': 123,
        };
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