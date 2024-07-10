import { SessionModel } from "./SessionModel.js"

class SessionController {
    constructor(field) {
        this.model = new SessionModel(field);
    }

    addPlayer(connection) {
        this.model.players[connection.id] = {};
        this.model.playersCount += 1;
    }

    updateConnection(connection) {
        this.model.connections[connection.id] = connection;
    }

    udpateParameters(body, id) {
        const player = body.player;
        const entity = this.model.players[id];
        //console.log(this.model.players, player.id);
        entity.x = player.x;
        entity.y = player.y;
        entity.angle = player.angle;
        entity.bullets = player.bullets;
        entity.skinId = player.skinId;
        entity.health = player.health;
        entity.isAlive = player.isAlive;
        
        this.updateWeapons(entity, player);
        
        this.updateHealth(body);
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

    updateHealth(body) {
        for (const id in body.damage) {

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