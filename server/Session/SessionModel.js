import {STATES} from "../CONST/GAME/ENTITY/BOT.js";

import { WEAPON_STATE } from "../CONST/GAME/WEAPON/WEAPON.js";

class SessionModel {
    constructor(field) {
        this.field = field;
        this.maxPlayers = 100;
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
                    x: 0,
                    y: 0
                },
                purpose: {
                    x: 1,
                    y: 1
                },
                skinId: 1,
                state: STATES.wanders
            },
            {
                current: {
                    x: 0,
                    y: 0
                },
                purpose: {
                    x: 1,
                    y: 1
                },
                skinId: 1,
                state: STATES.wanders
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
        this.bots.forEach(bot => {
            let closestPlayer = null;
            let minDistance = Infinity;

            for (const playerId in this.players) {
                const player = this.players[playerId];
                if (player.isAlive && this.isVisible(bot, player)) {
                    const distance = this.getDistance(bot.current, { x: player.x, y: player.y });
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestPlayer = player;
                    }
                }
            }

            if (closestPlayer) {
                bot.state = STATES.aimed;
                bot.purpose = { x: closestPlayer.x, y: closestPlayer.y };
            } else {
                bot.state = STATES.wanders;
                bot.purpose = this.getRandomCoordinates();
                bot.current = { ...bot.purpose };
            }
        });
    }

    isVisible(bot, player) {
        for (const wall of this.walls) {
            if (this.linesIntersect(bot.current, { x: player.x, y: player.y }, wall.start, wall.end)) {
                return false;
            }
        }
        return true;
    }

    linesIntersect(p1, p2, p3, p4) {
        const det = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
        if (det === 0) return false; // Линии параллельны

        const lambda = ((p4.y - p3.y) * (p4.x - p1.x) + (p3.x - p4.x) * (p4.y - p1.y)) / det;
        const gamma = ((p1.y - p2.y) * (p4.x - p1.x) + (p2.x - p1.x) * (p4.y - p1.y)) / det;

        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }

    getDistance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    }

    getRandomCoordinates() {
        return {
            x: Math.random() * this.field.width,
            y: Math.random() * this.field.height
        };
    }
}

export {SessionModel}