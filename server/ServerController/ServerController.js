import { PORT } from '../SERV_CONST.js';
import { WebSocketController } from '../WebSocketController/WebSocketController.js';

import express from 'express';
import http from 'http';
import { MapGenerator } from '../MapGenerator/MapGenerator.js';
import { RequestController } from '../RequestController/RequestController.js';

class ServerController {
    constructor() {
        this.port = PORT;
        this.app = express();
        this.server = http.createServer(this.app);
        this.generanor = new MapGenerator();
        this.request = new RequestController(this.app, this.generanor);

        this.server.listen(this.port, () => {
            console.log('Listening on port ' + this.port);
        });
        
        this.webSocket = new WebSocketController(this.server, this.getMap());
    }

    getMap() {
        return this.generanor.create();
    }
}

export { ServerController };