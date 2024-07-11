import { SessionModel } from "./SessionModel.js"

class SessionController {
    constructor(field) {
        this.model = new SessionModel(field);
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
        entity.field = body.field;
        
        this.updateWeapons(entity, player);

        this.updateBullets(entity, body)
        
        this.updateHealth(body, entity);
    }

    updateBullets(entity, body) {
        entity.bullets = body.bullets;
    }

    updateWeapons(entity, player) {
        this.model.objects.weaponId = null;
        if (entity.weaponId && !player.weapon.id) { // если оружие в руках было, но игрок его выбросил
            const weapon = this.model.objects.weapons[entity.weaponId];
            this.model.objects.weaponId = entity.weaponId;
            weapon.x = player.x;
            weapon.y = player.y;
            weapon.onGround = true;
            entity.weaponId = null;
        } else if (!entity.weaponId && player.weapon.id) { // если оружия в руках не было, игрок его подобрал
            entity.weaponId = player.weapon.id;
            const weapon = this.model.objects.weapons[entity.weaponId];
            this.model.objects.weaponId = entity.weaponId;
            weapon.x = player.x;
            weapon.y = player.y;
            weapon.amount = player.weapon.amount;
            weapon.onGround = false;
        } else if (entity.weaponId && player.weapon.id) { // если оружие в руках было и оно до сих пор в руках
            const weapon = this.model.objects.weapons[entity.weaponId];
            this.model.objects.weaponId = entity.weaponId;
            weapon.x = player.x;
            weapon.y = player.y;
            weapon.amount = player.weapon.amount;
        }
    }

    updateHealth(body, entity) {
        const damage = body.change.damage;
        const heal = body.change.heal;

        entity.health = Math.min(entity.maxHealth, entity.health + heal);
        
        if (entity.health > 0) entity.isAlive = true;

        for (let id in damage) {
            const player = this.model.players[id];
            player.health = Math.max(0, player.health - damage[id])
            if (player.health === 0) player.isAlive = false
        }
    }

    getData() {
        const response = {
            players: this.model.players,
            objects: this.model.objects,
        };
        return response;
    }
}

export {SessionController}