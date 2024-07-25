import {STATES} from "../CONST/GAME/ENTITY/BOT.js";
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
        this.bots = [
            {
                current: {
                    x: 170,
                    y: 170
                },
                skinId: 0,
                state: STATES.wanders,
                health: 5,
                maxHealth: ENTITY.maxHealth,
                id: "bot_0",
                shooting: false,
                isAlive: true,
            },
            {
                current: {
                    x: 350,
                    y: 350
                },
                skinId: 1,
                state: STATES.wanders,
                health: 5,
                maxHealth: ENTITY.maxHealth,
                id: "bot_1",
                shooting: false,
                isAlive: true,
            }
        ];
        //this.walls = this.convertWallList(field.map.walls);
    }

    convertWallList(wallList) {
        return wallList.map(wall => ({
            start: { x: wall[0] * 15, y: wall[1] * 15 },
            end: { x: wall[2] * 15, y: wall[3] * 15 }
        }));
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

    getDistance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
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