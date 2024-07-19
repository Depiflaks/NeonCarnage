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
        this.field.obj.weapons.forEach(weapon => {
            this.objects.weapons[weapon.id] = {
                id: weapon.id,
                onGround: true,
                x: weapon.x * 150 + 75,
                y: weapon.y * 150 + 75,
                amount: weapon.type.amount
            }
        });
    }
}

export {SessionModel}