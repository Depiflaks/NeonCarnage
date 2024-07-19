import { SessionModel } from "./SessionModel.js"
import { WEAPON_STATE } from "./../CONST/GAME/WEAPON/WEAPON.js"

class SessionController {
    constructor(field) {
        this.model = new SessionModel(field);
        this.startBotUpdates();
    }

    startBotUpdates() {
        setInterval(() => {
            this.model.updateBots();
        }, 1000);
    }

    addPlayer(connection, {health, maxHealth}) {
        this.model.players[connection.id] = {
            health: health,
            maxHealth: maxHealth,
            isAlive: true
        };
        this.model.playersCount += 1;
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

        //console.log(entity.meleeStrike);
        this.model.objects.corpses[id] = body.field.corpses;
        this.updateWeaponState(body, entity);
        this.updateWeapon(entity);
        //console.log(this.model.objects.weapons);
        this.updateAmount(body, entity);
        //this.updateMeleeStrike(entity, player);

        this.updateBullets(body, entity);
        
        this.updateHealth(body, entity, id);
    }

    updateBullets(body, entity) {
        entity.bullets = body.bullets;
    }

    updateWeaponState(body, entity) {
        const weapon = body.change.weapon;
        if (weapon.state === WEAPON_STATE.onTheGround) {
            this.model.objects.weapons[entity.weaponId].state = weapon.state;
            entity.weaponId = weapon.id;
        } else if (weapon.state === WEAPON_STATE.inTheHand) {
            this.model.objects.weapons[weapon.id].state = weapon.state;
            entity.weaponId = weapon.id;
        }
    }

    updateWeapon(entity) {
        if (!entity.weaponId) return;
        //console.log(this.model.objects.weapons);
        //console.log(this.model.objects.weapons[entity.weaponId]);
        this.model.objects.weapons[entity.weaponId].x = entity.x;
        this.model.objects.weapons[entity.weaponId].y = entity.y;
    }

    updateAmount(body, entity) {
        if (!entity.weaponId) return;
        const weapon = this.model.objects.weapons[entity.weaponId];
        weapon.amount += body.change.amount;
    }

    updateHealth(body, entity, entityId) {
        const damage = body.change.damage;
        const heal = body.change.heal;

        if (!entity.isReborning) entity.health = Math.min(entity.maxHealth, entity.health + heal);
        
        if (entity.health > 0) entity.isAlive = true;

        for (let id in damage) {
            const player = this.model.players[id];
            player.health = Math.max(0, player.health - damage[id])
            if (player.health === 0) {
                player.isAlive = false;
                if (player.weaponId) {
                    this.model.objects.weapons[player.weaponId].state = WEAPON_STATE.onTheGround;
                    player.weaponId = null;
                }
                if (!this.model.leaderBoard[entityId]) this.model.leaderBoard[entityId] = {
                    name: entity.nickname,
                    kills: 0
                }
                this.model.leaderBoard[entityId].kills += 1;
            }
        }
    }

    getData() {
        const response = {
            players: this.model.players,
            objects: {
                corpses: this.model.objects.corpses,
                weapons: this.model.objects.weapons,
            },
            leaderBoard: this.model.leaderBoard,
        };
        return response;
    }
}

export {SessionController}