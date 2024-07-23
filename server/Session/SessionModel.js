import {STATES} from "../CONST/GAME/ENTITY/BOT.js";

import { WEAPON_STATE } from "../CONST/GAME/WEAPON/WEAPON.js";

class SessionModel {
    constructor(field) {
        this.field = field;
        this.maxPlayers = 100;
        this.players = {};
        this.playersCount = 0;
        this.connections = {};
        //console.log(field);
        this.objects = {
            corpses: {},
            weapons: {},
            aidKits: Array(this.field.map.aidKits.length).fill(true),
            ammunitions: Array(this.field.map.ammunitions.length).fill(true),
        };
        //console.log(this.objects.aidKits);
        this.leaderBoard = {};
        this.objects.weapons = {};
        this.field.map.weapons.forEach(weapon => {
            this.objects.weapons[weapon.id] = {
                id: weapon.id,
                state: WEAPON_STATE.onTheGround,
                x: weapon.x * 150 + 75,
                y: weapon.y * 150 + 75,
                amount: weapon.type.amount
            }
        });
        this.bots = [
            {
                current: {
                    x: 150,
                    y: 150
                },
                skinId: 1,
                state: STATES.wanders,
                health: 5,
                nickname: "bot1",
            },
            {
                current: {
                    x: 350,
                    y: 350
                },
                skinId: 2,
                state: STATES.wanders,
                health: 5,
                nickname: "bot2",
            }
        ];
        this.walls = this.convertWallList(field.map.walls);
    }

    convertWallList(wallList) {
        return wallList.map(wall => ({
            start: { x: wall[0] * 15, y: wall[1] * 15 },
            end: { x: wall[2] * 15, y: wall[3] * 15 }
        }));
    }


    updateBots() {
        //console.log(this.players)
        this.bots.forEach(bot => {
            /*if (!bot.isActive()) {
                bot.state = STATES.wanders;
                return;
            }*/
            let closestPlayer = null;
            let minDistance = Infinity;

            for (const playerId in this.players) {
                const player = this.players[playerId];

                //console.log(player.visibleBots)

                for (const visibleBotId in player.visibleBots) {
                    const visibleBot = player.visibleBots[visibleBotId];
                    console.log(visibleBot.model.skinId)
                    if (visibleBot.model.skinId === bot.skinId) {
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
            } else {
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
}

export {SessionModel}