import { SessionController } from "../Session/SessionController.js";
import { WebSocketGame } from "../WebSocket/WebSocketGame.js";
import { WebSocketRoom } from "../WebSocket/WebSocketRoom.js";

export class ChildServer {
    constructor() {
        process.send({type: "init"});
        [this.id, this.port] = process.argv.slice(2)
        this.webSocket = new WebSocketRoom(this.port);

        process.on('message', (message) => {
            this.onMessage(message)
        });
    }

    onMessage(message) {
        switch (message.type) {
            case "init":
                console.log(`message from parent: ${message}`);
                break;
            case "start":
                this.startGame(message.body);
                break;
            default:
                break;
        }
    }

    startGame(body) {
        this.webSocket.kill();
        this.session = new SessionController(body);
        this.webSocket = new WebSocketGame(this.port, this.session);
    }
}