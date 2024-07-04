import WebSocket, { WebSocketServer } from 'ws';

class WebSocketController {
    constructor(server, map) {
        this.socket = new WebSocketServer({ server });
        this.map = map;
        this.socket.on('connection', (connection, req) => {this.onConnection(connection, req)});
    }

    init(connection, req) {
        const ip = req.socket.remoteAddress;
        connection.id = this.getUniqueID();
        console.log(`Connected ${ip}`);
        this.sendInit(connection);
        // дописать отправку карты
        //client.send(JSON.stringify({ id, x, y }), { binary: false });

        return ip;
    }

    onConnection(connection, req) {
        const ip = this.init(connection, req);

        connection.on('message', (message) => {this.onMessage(message, connection)});

        connection.on('close', () => {this.onClose(ip)});
    }

    onMessage(message, connection) {
        const { x, y, angle } = JSON.parse(message);
        for (const client of this.socket.clients) {
            //console.log('Received: ' + message);
            if (client.readyState !== WebSocket.OPEN) continue;
            if (client === connection) continue;
            const id = connection.id;
            client.send(JSON.stringify({ id, x, y, angle }), { binary: false });
        }
    }

    onClose(ip) {
        console.log(`Disconnected ${ip}`);
    }

    sendInit() {
        
    }

    sendResponse() {

    }

    send(connection, type, data) {
        const responseData = {
            type,
            data
        };
        connection.send(JSON.stringify(responseData), { binary: false });
    }

    getUniqueID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    }
}

export {WebSocketController};