const express = require('express');
const { fork } = require('child_process');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

class LobbyServer {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.rooms = {};
        this.wssPort = 8080;

        this.setupMiddleware();
        this.setupRoutes();
        this.setupWebSocketServer();
    }

    setupMiddleware() {
        this.app.use(bodyParser.json());
    }

    setupRoutes() {
        this.app.post('/createRoom', this.createRoom.bind(this));
        this.app.post('/joinRoom', this.joinRoom.bind(this));
    }

    setupWebSocketServer() {
        this.wss = new WebSocket.Server({ port: this.wssPort });
        this.wss.on('connection', this.handleWebSocketConnection.bind(this));
        this.roomChannels = {};
    }

    generateRoomId() {
        return Math.random().toString(36).substring(2, 9);
    }

    createRoom(req, res) {
        const roomId = this.generateRoomId();
        const roomProcess = fork('./room.js');

        this.rooms[roomId] = {
            process: roomProcess,
            players: []
        };

        roomProcess.on('message', (msg) => {
            if (msg.type === 'roomUpdate') {
                this.broadcastToRoom(roomId, msg);
            }
        });

        res.json({ roomId: roomId, websocketUrl: `ws://localhost:${this.wssPort}/${roomId}` });
    }

    joinRoom(req, res) {
        const { roomId, playerId } = req.body;
        const room = this.rooms[roomId];
        if (room) {
            room.players.push(playerId);
            room.process.send({ type: 'playerJoined', playerId: playerId });
            res.json({ status: 'ok' });
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    }

    handleWebSocketConnection(ws, req) {
        const roomId = req.url.substring(1);
        if (!this.roomChannels[roomId]) {
            this.roomChannels[roomId] = [];
        }
        this.roomChannels[roomId].push(ws);

        ws.on('message', (message) => {
            const data = JSON.parse(message);
            const roomProcess = this.rooms[roomId].process;

            roomProcess.send({ type: 'playerAction', playerId: data.playerId, action: data.action });
        });

        ws.on('close', () => {
            this.roomChannels[roomId] = this.roomChannels[roomId].filter(client => client !== ws);
        });
    }

    broadcastToRoom(roomId, message) {
        this.roomChannels[roomId].forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Lobby server listening at http://localhost:${this.port}`);
        });
    }
}

const lobbyServer = new LobbyServer();
lobbyServer.start();
