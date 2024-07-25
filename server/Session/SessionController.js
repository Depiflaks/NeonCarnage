import { SessionModel } from "./SessionModel.js"
import { WEAPON_STATE } from "./../CONST/GAME/WEAPON/WEAPON.js"
import { AIDKIT } from "../CONST/GAME/FIELD/AIDKIT.js";
import { AMMUNITION } from "../CONST/GAME/FIELD/AMMUNITION.js";
import { ENTITY } from "../CONST/GAME/ENTITY/ENTITY.js";
import { GAME_MODE } from "../CONST/GAME/GAME.js";
import { setInterval } from "timers";

class SessionController {
    constructor(field) {
        this.model = new SessionModel(field);
        this.spawn = 0;
        //this.startBotUpdates();
    }

    addPlayer(connection, {health, maxHealth, nickname}) {
        this.model.players[connection.id] = {
            health: health,
            maxHealth: maxHealth,
            isAlive: true,
            nickname: nickname
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
        this.model.updateBots();
        //this.checkEndCondition();
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
            setTimeout(() => {
                this.model.objects.aidKits[id] = true;
            }, AIDKIT.delay);
        }
        if (entity.health > 0) entity.isAlive = true;
    }

    updateAmmunitions(body, entity) {
        const ammunitions = body.change.ammunitions;
        for (let id of new Set(ammunitions)) {
            this.model.objects.ammunitions[id] = false;
            setTimeout(() => {
                this.model.objects.ammunitions[id] = true;
            }, AMMUNITION.delay);
        }
    }

    updateDamage(body, entity, entityId) {
        const damage = body.change.damage;

        for (let id in damage) {
            const player = this.model.players[id];
            player.health = Math.max(0, player.health - damage[id])
            if (player.health === 0) {
                player.isAlive = false;
                if (this.model.mode.respawn.player) {
                    setTimeout(() => {
                        player.spawnPoint = this.nextSpawnPoint();
                        player.isAlive = true;
                        player.health = player.maxHealth;
                    }, ENTITY.rebornDelay);
                }
                if (player.weaponId) {
                    this.model.objects.weapons[player.weaponId].state = WEAPON_STATE.onTheGround;
                    player.weaponId = null;
                }
                this.model.leaderBoard[entityId].kills += 1;
            }
        }
    }

    checkEndCondition() {
        switch (this.model.gameMode) {
            case GAME_MODE.deathMatch:
                
                break;
            case GAME_MODE.battleRoyale:
                
                break;
            case GAME_MODE.operationOverrun:
                break;  
            default:
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
        };
        return response;
    }
}

export {SessionController}