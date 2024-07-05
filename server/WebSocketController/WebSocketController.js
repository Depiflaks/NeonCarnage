import WebSocket, { WebSocketServer } from 'ws';

class WebSocketController {
    constructor(server, map) {
        this.socket = new WebSocketServer({ server });
        this.map = map;
        this.socket.on('connection', (connection, req) => {this.onConnection(connection, req)});
    }

    onConnection(connection, req) {
        const ip = this.init(connection, req);

        connection.on('message', (message) => {this.onMessage(message, connection)});

        connection.on('close', () => {this.onClose(ip)});
    }

    init(connection, req) {
        const ip = req.socket.remoteAddress;
        connection.id = this.getUniqueID();
        console.log(`Connected ${ip}`);
        //this.sendInit(connection, this.map);

        return ip;
    }

    onMessage(message, connection) {
        const data = JSON.parse(message);
        if (data.type === 'map') {
            this.sendInit(connection, this.map);
        } else if (data.type === "update") {
            for (const client of this.socket.clients) {
                //console.log('Received: ' + message);
                if (client.readyState !== WebSocket.OPEN) continue;
                if (client === connection) continue;
    
                const json_data = {
                    id: connection.id,
                    x: data.body.x,
                    y: data.body.y,
                    angle: data.body.angle
                }
                this.sendResponse(client, json_data)
            }
        }
        
    }

    onClose(ip) {
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

    getUniqueID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    }
}

export {WebSocketController};