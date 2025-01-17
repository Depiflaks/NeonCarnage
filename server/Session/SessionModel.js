import {STATES} from "../CONST/GAME/ENTITY/BOT.js";
import { RAD } from "../CONST/GAME/GAME.js";
import { GAME_MODE } from "../CONST/GAME/GAME.js";

import { WEAPON_STATE } from "../CONST/GAME/WEAPON/WEAPON.js";
import {ENTITY} from "../CONST/GAME/ENTITY/ENTITY.js";

class SessionModel {
    constructor(data) {
        this.field = data.map;
        
        switch (data.mode) {
            case GAME_MODE.deathMatch.name:
                this.mode = GAME_MODE.deathMatch
                break;
            case GAME_MODE.battleRoyale.name:
                this.mode = GAME_MODE.battleRoyale
                break;
            case GAME_MODE.operationOverrun.name:
                this.mode = GAME_MODE.operationOverrun
                break;
        }
        if (this.mode.area || this.mode.endPoint) this.area = data.map.map.area;
        if (this.mode.endPoint || this.mode.area) this.deadList = []
        this.maxPlayers = 4;
        this.players = {};
        this.playersCount = 0;
        this.connections = {};
        this.objects = {
            
            corpses: {},
            weapons: {},
            aidKits: Array(this.field.map.aidKits.length).fill(true),
            ammunitions: Array(this.field.map.ammunitions.length).fill(true),
            pointer: {
                x: 500,
                y: 500,
            }
        };
        this.leaderBoard = {};
        this.objects.weapons = {};
        this.field.map.weapons.forEach(weapon => {
            this.objects.weapons[weapon.id] = {
                id: weapon.id,
                state: WEAPON_STATE.onTheGround,
                x: weapon.x * 150 + 75,
                y: weapon.y * 150 + 75,
                amount: weapon.type.amount,
                maxAmount: weapon.type.amount,
            }
        });
        this.bots = this.field.map.bots;
    }


    updateBots() {
        this.bots.forEach(bot => {


            if (!bot.isAlive) {
                bot.shooting = false;
                return
            }

            let closestPlayer = null;
            let minDistance = Infinity;

            for (const playerId in this.players) {
                const player = this.players[playerId];

                for (const visibleBotId in player.visibleBots) {
                    const visibleBot = player.visibleBots[visibleBotId];
                    if (visibleBot === bot.id) {
                        if (player.isAlive) {
                            const distance = this.getDistance(bot.current, {x: player.x, y: player.y});
                            if (distance < minDistance) {
                                minDistance = distance;
                                closestPlayer = player;
                            }
                        }
                    }
                }
            }

            if (closestPlayer) {
                bot.state = STATES.aimed;
                bot.purpose = { x: closestPlayer.x, y: closestPlayer.y };
                bot.angle = this.getAngle(bot.current, closestPlayer);
                bot.shooting = true
            } else {
                bot.shooting = false;
                bot.state = STATES.wanders;
            }
        });

    }

    getDistance({x: x1, y: y1}, {x: x2, y: y2}) {
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }

    getAngle(from, to) {
        return Math.atan2(to.y - from.y, to.x - from.x);
    }

    getSpawnPoint(id){
        return this.field.map.spawnPoints[id];
    }

    getRandomSpawn() {
        const {x, y} = this.field.map.spawnPoints[Math.floor(Math.random() * this.field.map.spawnPoints.length)];
        return {x, y};
    }
}

export {SessionModel}