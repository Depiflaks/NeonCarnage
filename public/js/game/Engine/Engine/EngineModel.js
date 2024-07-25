import { Field } from "../Field/Field.js";
import { PlayerController } from "../Entity/Player/PlayerController.js";
import { Drawable } from "../Interface/Drawable.js";


class EngineModel {
    constructor({map: {cells, walls, weapons, ammunitions, aidKits, spawnPoints, area}, player: player, mode: mode}, soundController) {
        this.field = new Field({
            groundList: cells, 
            wallList: walls, 
            weaponSet: weapons, 
            ammunitionSet: ammunitions, 
            aidKitSet: aidKits, 
            spawnPoints: spawnPoints
        });
        this.player = new PlayerController({x: 600, y: 500}, player.skinId, player.nickName, soundController);
        this.mode = mode;
        this.enemies = [];
        this.playerList = {};
        this.leaderBoardView = false;
        this.bots = [];
        if (this.mode.area) {
            this.area = new Drawable(area.x, area.y, 0, 0);
            this.area.radius = area.radius;
            this.area.radiusFact = area.radius;
        }
        
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