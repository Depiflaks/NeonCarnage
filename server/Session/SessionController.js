import { SessionModel } from "./SessionModel.js"

class SessionController {
    constructor(map) {
        this.model = new SessionModel(map);

    }

    addPlayer(player) {
        this.model.players[player.id] = {
            x: 0,
            y: 0,
            angle: 0,
            health: null,

        }
    }
}

export {SessionController}