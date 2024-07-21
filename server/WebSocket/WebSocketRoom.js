import WebSocket, { WebSocketServer } from 'ws';
import crypto from 'crypto';

class WebSocketRoom {
    constructor(server) {
        this.socket = new WebSocketServer({ server });
        this.players = [];
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
        this.updateConnection(connection);
        const body = {
            id: connection.id,
        }
        this.sendInit(this.connections[connection.id], body);
        console.log(`Connected ${ip}`);

        for (let id in this.connections) {
            this.send(this.connections[id], "update", {})
        }
    }

    onMessage(message, connection) {
        
        const data = JSON.parse(message);
        console.log(data);
        if (data.type === "updateRoom") {
            this.updateRoom(data.body);
        }

        if (data.type === "getRoomStatus") {
            this.getRoomStatus(connection);
        }
    }

    updateRoom(body) {
        const index = this.players.findIndex(player => player.id === body.id);
        if (index === -1) {
            // Если объект с таким id не найден, добавить новый объект
            body.ready = false;
            this.players.push(body);
        } else {
            // Если объект с таким id найден, обновить его свойство ready
            this.players[index].ready = !this.players[index].ready;
            this.players[index].playerId = body.playerId;
        }

        for (let id in this.connections) {
            this.sendResponse(this.connections[id], this.players);
        }
    }   

    getRoomStatus(connection) {
        this.sendResponse(connection, this.players);
    }

    updateConnection(connection) {
        this.connections[connection.id] = connection;
    }

    onClose(req) {
        const ip = req.socket.remoteAddress;
        console.log(`Disconnected ${ip}`);
        this.players = [];
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
        //console.log("Отправка данных на сервер:", data);
        connection.send(JSON.stringify(responseData), { binary: false });
    }

    getUniqueID(ipAddress) {
        return crypto.createHash('sha256').update(ipAddress).digest('hex');
    }
}

export {WebSocketRoom};