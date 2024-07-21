import { PORT } from '../CONST/SERVER/SERVER.js';
import { WebSocketRoom } from '../WebSocket/WebSocketRoom.js';

import express from 'express';
import http from 'http';
import { Map } from '../Map/Map.js';
import { RequestController } from '../RequestController/RequestController.js';
import { SessionController } from '../Session/SessionController.js';

class ServerController {
    constructor() {
        this.port = PORT;
        this.app = express();
        this.server = http.createServer(this.app);
        this.app.use(express.json());

        this.creature = new Map();
        this.request = new RequestController(this.app, this.creature);

        //this.sessions = [];

        //this.sessions.push(new SessionController(this.getMap()))

        this.server.listen(this.port, () => {
            console.log('Listening on port ' + this.port);
        });

        this.webSocket = new WebSocketRoom(this.server);
    }

    getMap() {
        return this.creature.create();
    }
}

export { ServerController };