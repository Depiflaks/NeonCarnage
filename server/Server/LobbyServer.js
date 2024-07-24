import { PORT } from '../CONST/SERVER/SERVER.js';
import { WebSocketRoom } from '../WebSocket/WebSocketRoom.js';

import { Map } from '../Map/Map.js';
import { RequestController } from '../RequestController/RequestController.js';
import { SessionController } from '../Session/SessionController.js';

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { ChildController } from '../ChildController/ChildController.js';



class LobbyServer {
    constructor() {
        this.port = PORT;
        this.app = express();
        this.server = http.createServer(this.app);
        this.app.use(express.json());
        this.app.use(bodyParser.json());

        this.creature = new Map();
        this.child = new ChildController(8080);
        this.request = new RequestController(this.app, this.creature, this.child);

        //this.sessions = [];

        //this.sessions.push(new SessionController(this.getMap()))

        this.server.listen(this.port, () => {
            console.log('Listening on port ' + this.port);
        });
    }
}

export { LobbyServer };