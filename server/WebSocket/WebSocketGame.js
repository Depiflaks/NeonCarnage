import WebSocket, { WebSocketServer } from 'ws';
import crypto from 'crypto';

class WebSocketGame {
    constructor(server, session) {
        this.socket = new WebSocketServer({ server });
        this.session = session;
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
        this.session.updateConnection(connection);
        const body = {
            id: connection.id,
        }
        this.sendInit(connection, body);
        console.log(`Connected ${ip}`);
    }

    onMessage(message, connection) {
        const data = JSON.parse(message);
        if (data.type === "update") {
            this.doUpdate(connection, data.body);
        }
    }

    doUpdate(connection, body) {
        if (!this.session.model.players[connection.id]) this.session.addPlayer(connection, {
            health: body.player.health,
            maxHealth: body.player.maxHealth,
        });
        this.session.updateParameters(body, connection.id);
        const data = this.session.getData();
        for (let id in this.session.model.players) {
            if (this.session.model.connections[id].readyState !== WebSocket.OPEN) continue;
            this.sendResponse(this.session.model.connections[id], data)
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

export {WebSocketGame};