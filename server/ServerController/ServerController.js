import { PORT } from '../SERV_CONST.js';
import { WebSocketController } from '../WebSocketController/WebSocketController.js';

import express from 'express';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

class ServerController {
    constructor() {
        this.port = PORT;
        this.app = express();
        this.server = http.createServer(this.app);

        // Получение текущего каталога при использовании модулей ES6
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        this.app.use('/public', express.static(path.join(__dirname, '../../public')));
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/game/game.html'));
        });

        this.server.listen(this.port, () => {
            console.log('Listening on port ' + this.port);
        });

        this.webSocket = new WebSocketController(this.server);
    }
}

export { ServerController };