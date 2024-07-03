import WebSocket from "ws";

class WebSocketController {
    constructor(server) {
        
        this.wss = new WebSocket.Server({ server });

        this.wss.on('connection', (connection, req) => {
            const ip = req.socket.remoteAddress;
            connection.id = this.getUniqueID()
            console.log(`Connected ${ip}`);

            connection.on('message', (message) => {
                console.log('Received: ' + message);
                const {x, y} = JSON.parse(message);
                for (const client of this.wss.clients) {
                    if (client.readyState !== WebSocket.OPEN) continue;
                    if (client === connection) continue;
                    id = connection.id;
                    client.send(JSON.stringify({id, x, y}), { binary: false });
                }
            });

            connection.on('close', () => {
                console.log(`Disconnected ${ip}`);
            });
        });
    }

    getUniqueID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    }
}

export {WebSocketController};