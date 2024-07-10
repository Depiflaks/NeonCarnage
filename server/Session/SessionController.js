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
        entity.isAlive = true;
        if (player.weapon) {
            entity.weaponId = player.weapon.id;
            const weapon = this.model.objects.weapons[entity.weaponId];
            weapon.amount = player.weapon.amount;
            weapon.x = player.x;
            weapon.y = player.y;
            weapon.onGround = false;
        } else {

        }
        this.updateHealth(body);
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