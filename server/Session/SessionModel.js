class SessionModel {
    constructor(map) {
        this.map = map;
        this.maxPlayers = 100;
        this.players = {};
        this.playersCount = 0;
        this.objects = {}

    }
}

export {SessionModel}