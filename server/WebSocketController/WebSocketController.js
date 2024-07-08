import WebSocket, { WebSocketServer } from 'ws';
import crypto from 'crypto';

class WebSocketController {
    constructor(server, map) {
        this.socket = new WebSocketServer({ server });
        this.map = map;
        this.socket.on('connection', (connection, req) => {this.onConnection(connection, req)});
    }

    onConnection(connection, req) {
        this.init(connection, req);

        connection.on('message', (message) => {this.onMessage(message, connection)});

        connection.on('close', () => {this.onClose(req)});
    }

    init(connection, req) {
        const ip = req.socket.remoteAddress;
        connection.id = this.getUniqueID(ip);
        console.log(`Connected ${ip}`);
        //this.sendInit(connection, this.map);
    }

    onMessage(message, connection) {
        const data = JSON.parse(message);
        if (data.type === 'map') {
            this.doMap(connection);
        } else if (data.type === "update") {
            this.doUpdate(connection, data.body);
        }
    }

    doMap(connection) {
        this.sendInit(connection, this.map);
    }

    doUpdate(connection, body) {
        for (const client of this.socket.clients) {
            const player = body.player;
            if (client.readyState !== WebSocket.OPEN) continue;
            if (client === connection) continue;
            const data = {
                player: {
                    id: connection.id,
                    x: player.x,
                    y: player.y,
                    angle: player.angle,
                    weapon: player.weapon,
                },
                
            }
            this.sendResponse(client, data)
        }
    }

    onClose(req) {
        const ip = req.socket.remoteAddress;
        console.log(`Disconnected ${ip}`);
    }

    sendInit(connection, data) {
        this.send(connection, "init", data)
    }

    sendResponse(connection, data) {
        this.send(connection, "response", data)
    }

    send(connection, type, data) {
        const responseData = {
            type: type,
            body: data
        };
        connection.send(JSON.stringify(responseData), { binary: false });
    }

    getUniqueID(ipAddress) {
        return crypto.createHash('sha256').update(ipAddress).digest('hex');
    }
}

export {WebSocketController};