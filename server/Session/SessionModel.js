class SessionModel {
    constructor(field) {
        this.field = field;
        this.maxPlayers = 100;
        this.players = {};
        this.playersCount = 0;
        this.connections = {};
        this.objects = {
            corpses: {},
            weapons: [],
            weaponId: null,
        };
        this.objects.weapons = this.field.obj.weapons.map(weapon => {
            return { // пока напишу небольшой костыль для координат, потом исправим
                id: weapon.id,
                onGround: true,
                x: weapon.x * 150 + 75,
                y: weapon.y * 150 + 75,
                amount: weapon.type.amount
            }
        })
    }
}

export {SessionModel}