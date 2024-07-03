import { PORT } from '../SERV_CONST.js';
import { WebSocketController } from '../WebSocketController/WebSocketController.js';

import express from 'express';
import path from 'path';
import http from 'http';

class ServerController {
    constructor() {
        this.port = PORT;
        this.app = express();
        this.server = http.createServer(this.app);

        this.app.use('/public', express.static(path.join(__dirname, '../public')));
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../templates/game/game.html'));
        });

        server.listen(this.port, () => {
            console.log('Listening on port ' + this.port);
        });

        //this.webSocket = new WebSocketController(this.server);
    }
}

export {ServerController};