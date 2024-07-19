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
        };
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
    }
}

export {SessionModel}