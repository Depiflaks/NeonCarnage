import { Field } from "../Field/Field.js";
import { PlayerController } from "../Entity/Player/PlayerController.js";


class EngineModel {
    constructor({map: {cells, walls, weapons, ammunitions, aidKits, spawnPoints}, player: player}) {
        this.field = new Field({
            groundList: cells, 
            wallList: walls, 
            weaponSet: weapons, 
            ammunitionSet: ammunitions, 
            aidKitSet: aidKits, 
            spawnPoints: spawnPoints
        });
        this.player = new PlayerController(this.field.getSpawnPoint(), player.skinId, player.nickName);
        this.enemies = [];
        this.playerList = {};
        this.leaderBoard = false;
        this.bots = [];
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

    getBots() {
        return this.bots;
    }
}

export { EngineModel };