import WebSocket, { WebSocketServer } from 'ws';
import crypto from 'crypto';

class WebSocketRoom {
    constructor(server) {
        this.socket = new WebSocketServer({ server });
        this.connections = {};
        this.socket.on('connection', (connection, req) => {this.onConnection(connection, req)});
    }

    onConnection(connection, req) {
        this.init(connection, req);

        connection.on('message', (message) => {
            this.onMessage(message, connection)
        });

        connection.on('close', () => {this.onClose(req)});
    }

    init(connection, req) {
        const ip = req.socket.remoteAddress;
        connection.id = this.getUniqueID(ip);
        this.updateConnections(connection);
        const body = {
            id: connection.id,
        }
        this.sendInit(connection, body);
        console.log(`Connected ${ip}`);
    }

    onMessage(message, connection) {
        const data = JSON.parse(message);
        if (data.type === "chat") {
            this.updateChat(data.body);
        }
    }

    updateChat(body) {
        for (let id in this.connections) {
            this.sendResponse(this.connections[id], body);
        }
    } 

    updateConnections(connection) {
        this.connections[connection.id] = connection;
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

export {WebSocketRoom};