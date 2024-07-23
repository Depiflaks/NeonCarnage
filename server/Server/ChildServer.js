import { WebSocketRoom } from "../WebSocket/WebSocketRoom.js";

export class ChildServer {
    constructor() {
        process.send('hello, parent');
        [this.id, this.port] = process.argv.slice(2)
        console.log(this.id, this.port);
        this.webSocket = new WebSocketRoom(this.port);
    }

    onMessage() {
        process.on('message', (message) => {
            console.log(`message from parent: ${message}`);
        });
    }
}