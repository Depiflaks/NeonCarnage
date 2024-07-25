import { SessionModel } from "./SessionModel.js"
import { WEAPON_STATE } from "./../CONST/GAME/WEAPON/WEAPON.js"
import { AIDKIT } from "../CONST/GAME/FIELD/AIDKIT.js";
import { AMMUNITION } from "../CONST/GAME/FIELD/AMMUNITION.js";
import { ENTITY } from "../CONST/GAME/ENTITY/ENTITY.js";
import { RAD } from "../CONST/GAME/GAME.js";
import { GAME_MODE } from "../CONST/GAME/GAME.js";
import { setInterval } from "timers";

class SessionController {
    constructor(data) {
        this.model = new SessionModel(data);
        this.spawn = 0;
        this.initGameMode()
    }

    initGameMode() {
        switch (this.model.mode.name) {
            case GAME_MODE.deathMatch.name:
                this.initDeathMatch()
                break;
            case GAME_MODE.battleRoyale.name:
                this.initBattleRoyale()
                break;
            case GAME_MODE.operationOverrun.name:
                this.initOperationOverrun()
                break;  
        }
    }

    initDeathMatch() {
        this.timer = this.model.mode.seconds;
        this.interval = setInterval(() => {this.decTimer()}, 1000);
    }

    decTimer() {
        this.timer -= 1;
    }

    initBattleRoyale() {
        this.interval = setInterval(() => {this.updateDeathArea()}, 1000);
    }

    initOperationOverrun() {

    }

    addPlayer(connection, {health, maxHealth, nickname}) {
        this.model.players[connection.id] = {
            health: health,
            maxHealth: maxHealth,
            isAlive: true,
            nickname: nickname,
            visible: true,
            selfDamage: 0,
            pointer: {
                x: 0,
                y: 0,
            },
            ghost: false,
        };
        if (!this.model.leaderBoard[connection.id]) this.model.leaderBoard[connection.id] = {
            name: nickname,
            kills: 0
        }
        this.model.playersCount += 1;
    }

    nextSpawnPoint() {
        const spawnPoint = this.model.getSpawnPoint(this.spawn);
        this.spawn += 1;
        if (this.spawn === 4) {
            this.spawn = 0;
        }
        return spawnPoint;
    }

    randomSpawnPoint() {
        return this.model.getRandomSpawn();
    }

    updateConnection(connection) {
        this.model.connections[connection.id] = connection;
    }

    updateParameters(body, id) {
        const player = body.player;
        const entity = this.model.players[id];
        entity.x = player.x;
        entity.y = player.y;
        entity.angle = player.angle;
        entity.skinId = player.skinId;
        entity.isReborning = player.isReborning;
        entity.nickname = player.nickname;
        entity.meleeStrike = player.meleeStrike;
        entity.visibleBots = player.visibleBots;

        this.model.objects.corpses[id] = body.field.corpses;
        this.updateWeaponState(body, entity);
        this.updateWeapon(entity);

        this.updateAmount(body, entity);

        this.updateBullets(body, entity);
        
        this.updateAidKits(body, entity);
        this.updateAmmunitions(body, entity);
        this.updateDamage(body, entity, id);
        this.pointerUpdate(player);
        this.updateBotDamage(body);

        if (this.model.mode.bots) this.model.updateBots();

        this.checkEndCondition();
    }

    updateDeathArea() {
        this.model.area.radius -= this.model.mode.areaSpeed;
        for (const id in this.model.players) {
            const player = this.model.players[id]
            if (this.isInArea(player)) continue;
            player.selfDamage += 1;
        }
    }

    updateFinishArea() {
        for (const id in this.model.players) {
            const player = this.model.players[id]
            if (!player.isAlive || !this.isInArea(player)) return false;
        }
        return true;
    }

    isInArea({x, y}) {
        const distance = Math.sqrt((x - this.model.area.x) ** 2 + (y - this.model.area.y) ** 2);

        return distance <= this.model.area.radius - 500;
    }

    updateBullets(body, entity) {
        entity.bullets = body.bullets;
    }

    updateWeaponState(body, entity) {
        const weapon = body.change.weapon;
        if (weapon.state === WEAPON_STATE.onTheGround) {
            if (!entity.weaponId) return;
            this.model.objects.weapons[entity.weaponId].state = weapon.state;
            entity.weaponId = weapon.id;
        } else if (weapon.state === WEAPON_STATE.inTheHand && this.model.objects.weapons[weapon.id].state === WEAPON_STATE.onTheGround) {
            this.model.objects.weapons[weapon.id].state = weapon.state;
            entity.weaponId = weapon.id;
        }
    }

    updateWeapon(entity) {
        if (!entity.weaponId) return;
        this.model.objects.weapons[entity.weaponId].x = entity.x;
        this.model.objects.weapons[entity.weaponId].y = entity.y;
    }

    updateAmount(body, entity) {
        if (!entity.weaponId) return;
        const weapon = this.model.objects.weapons[entity.weaponId];
        weapon.amount = Math.min(weapon.maxAmount, Math.max(0, weapon.amount + body.change.amount));
    }

    updateAidKits(body, entity) {
        const aidKits = body.change.aidKits;
        for (let id of new Set(aidKits)) {
            if (!entity.isReborning) entity.health = Math.min(entity.maxHealth, entity.health + AIDKIT.amount);
            
            this.model.objects.aidKits[id] = false;
            if (this.model.mode.respawn.aidKid) setTimeout(() => {
                this.model.objects.aidKits[id] = true;
            }, AIDKIT.delay);
        }
        if (entity.health > 0) entity.isAlive = true;
    }

    updateAmmunitions(body, entity) {
        const ammunitions = body.change.ammunitions;
        for (let id of new Set(ammunitions)) {
            this.model.objects.ammunitions[id] = false;
            if (this.model.mode.respawn.ammunition) setTimeout(() => {
                this.model.objects.ammunitions[id] = true;
            }, AMMUNITION.delay);
        }
    }

    updateDamage(body, entity, entityId) {
        const damage = body.change.damage;
        for (const id in this.model.players) {
            const player = this.model.players[id]
            if (!damage[id]) damage[id] = 0;
            damage[id] += player.selfDamage;
            player.selfDamage = 0;
        }
        for (let id in damage) {
            const player = this.model.players[id];
            player.health = Math.max(0, player.health - damage[id])
            if (player.health === 0 && player.isAlive) {
                player.isAlive = false;
                if (this.model.mode.respawn.player) {
                    setTimeout(() => {
                        player.spawnPoint = this.nextSpawnPoint();
                        player.isAlive = true;
                        player.visible = false;
                        setTimeout(() => {player.visible = true}, 2000);
                        player.health = player.maxHealth;
                    }, ENTITY.rebornDelay);
                } 
                // else {
                //     player.ghost = true;
                //     player.isAlive = true;
                //     player.visible = false;
                // }
                if (player.weaponId) {
                    this.model.objects.weapons[player.weaponId].state = WEAPON_STATE.onTheGround;
                    player.weaponId = null;
                }
                if (this.model.mode.leaderBoard) this.model.leaderBoard[entityId].kills += 1;
                if (this.model.mode.endPoint || this.model.mode.area) this.model.deadList.push(id)
            }
        }
    }

    updateBotDamage(body) {
        const damage = body.change.botDamage;
        for (let id in damage) {
            this.model.bots.forEach(bot => {
                if (id === bot.id) {
                    bot.health = Math.max(0, bot.health - damage[id]);
                    if (bot.isAlive && bot.health === 0) {
                        bot.isAlive = false;
                    }
                }
            });
        }
    }

    updateBotDamage(body) {
        const damage = body.change.botDamage;
        for (let id in damage) {
            this.model.bots.forEach(bot => {
                if (id === bot.id) {
                    bot.health = Math.max(0, bot.health - damage[id]);
                    if (bot.isAlive && bot.health === 0) {
                        bot.isAlive = false;
                    }
                }
            });
        }
    }

    checkEndCondition() {
        switch (this.model.mode.name) {
            case GAME_MODE.deathMatch.name:
                if (this.timer === 0) {
                    clearInterval(this.interval)
                    this.end(this.calculateScores(this.model.leaderBoard));
                }
                break;
            case GAME_MODE.battleRoyale.name:
                if (this.model.playersCount < 2) return;
                let alive = [];
                for (let id in this.model.players) {
                    if (this.model.players[id].isAlive) alive.push(id);
                }
                if (alive.length === 1) {
                    this.model.deadList.push(alive[0]);
                }
                if (this.model.area.radius < 100) {
                    this.model.mode.areaSpeed = 0;
                }
                if (alive.length <= 1) {
                    clearInterval(this.interval)
                    const res = {}
                    for (let i = 0; i < this.model.deadList.length; i++) {
                        let score = (i + 1) * 25;
                        res[this.model.deadList[i]] = {
                            score: score,
                            name: this.model.players[this.model.deadList[i]].nickname,
                        };
                    }
                    this.end(res);
                }
                break;
            case GAME_MODE.operationOverrun.name:
                const res = {}
                if (this.model.deadList.length === this.model.playersCount) {
                    for (let id in this.model.players) {
                        res[id] = {
                            name: this.model.players[id].nickname,
                            score: 0,
                        }
                    }
                    this.end(res);
                    return;
                }
                if (!this.updateFinishArea()) return;
                for (let id in this.model.players) {
                    res[id] = {
                        name: this.model.players[id].nickname,
                        score: 75,
                    }
                }
                for (let id in this.model.deadList) {
                    res[id].score = 25;
                }
                this.end(res);
                break;
            default:
                break;
        }
    }

    calculateScores(players) {
        const playersArray = Object.entries(players);

        playersArray.sort(([, a], [, b]) => a.kills - b.kills);
        const result = {}
        playersArray.forEach(([playerId, player], index) => {
          result[playerId] = {
            name: player.name,
            score: (index + 1) * 25
          };
        });
      
        return result;
      }

    updatePointers() {
        for (const playerId in this.model.players) {
            const player = this.model.players[playerId];
            player.pointer = { x: this.model.area.x, y: this.model.area.y}; 
        }
    }

    updatePointersDM() {
        for (const playerId in this.model.players) {
            const player = this.model.players[playerId];
            let minDistance = Infinity;
            for (const enemyId in this.model.players) {
                const enemy = this.model.players[enemyId]
                if (playerId === enemyId || !enemy.isAlive) continue;
                const distance = this.model.getDistance(player, enemy);
                if (distance < minDistance) {
                    minDistance = distance;
                    player.pointer = {x: enemy.x, y: enemy.y};
                }
            }
        }
    }

    pointerUpdate(player) {
        switch (this.model.mode.name) {
            case GAME_MODE.deathMatch.name:
                this.updatePointersDM(player);
                break;
            case GAME_MODE.battleRoyale.name:
                this.updatePointers()
                break;
            case GAME_MODE.operationOverrun.name:
                this.updatePointers()
                break;  
        }
        
    }

    getData() {
        const response = {
            players: this.model.players,
            objects: {
                corpses: this.model.objects.corpses,
                weapons: this.model.objects.weapons,
                aidKits: this.model.objects.aidKits,
                ammunitions: this.model.objects.ammunitions,
            },
            leaderBoard: this.model.leaderBoard,
            bots: this.model.bots,
            timer: this.timer,
            area: this.model.area,
        };
        return response;
    }
}

export {SessionController}