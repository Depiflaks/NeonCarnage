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
            
            let damage = 0;
            for (const damageClientId in body.damage) {
                if (client.id === damageClientId) {
                    damage = body.damage[damageClientId].shotDown;
                }
            }
            const data = {
                player: {
                    id: connection.id,
                    x: player.x,
                    y: player.y,
                    angle: player.angle,
                    weapon: player.weapon,
                    health: player.health,
                    maxHealth: player.maxHealth
                },
                damage: {damage}
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