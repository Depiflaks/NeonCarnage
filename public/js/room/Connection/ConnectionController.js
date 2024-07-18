import { SERVER } from "../../game/CONST.js";

class ConnectionController {
    constructor() {
        this.socket = new WebSocket(SERVER.ignat);
        this.initEventListeners();
        this.playerReady = [];
    }

    setObj(player, field, enemies, playerList) {
        this.player = player;
        this.field = field;
        this.enemies = enemies;
        this.playerList = playerList;
    }

    send(type, body) {
        if (this.socket.readyState === WebSocket.OPEN) {
            const data = {
                type: type,
                body: body
            };
            this.socket.send(JSON.stringify(data));
        }
    }

    initEventListeners() {
        this.socket.addEventListener('open', ({ data }) => {this.onOpen(data)});
        this.socket.addEventListener('message', ({ data }) => {
            this.data = JSON.parse(data);
            this.onMessage();
        });
        this.socket.addEventListener('close', ({ data }) => {this.onClose(data)});
        this.socket.addEventListener('error', (error) => {this.onError(error)});
    }

    onOpen(data) {
        console.log('Соединение установлено');
    }

    onMessage() {
        const data = this.data;
        console.log(1, data);
        const type = data.type;
        const body = data.body;
        switch (type) {
            case "init":
                this.init(body);
                break;
            case "response":
                this.response(body);
                break;
            case "update":
                this.updatePlayerList();
                break;
            default:
                break;
        }
    }

    init(body) {
        this.id = body.id;
    }

    response(body) {
        console.log(body);
        body.forEach(playerStatus => {
            const { playerId, ready } = playerStatus;

            const playerIndex = this.playerReady.findIndex(player => player.playerId === playerId);
            if (playerIndex !== -1) {
                this.playerReady[playerIndex].ready = ready;
            } else {
                this.playerReady.push(playerStatus);
            }

            this.updatePlayerStatus(playerId, ready);
        });

        const allReady = body.every(playerStatus => playerStatus.ready === true);

        if(allReady) {
            window.location.href = `/game`;
        }

    }

    updatePlayerStatus(playerId, ready) {
        const playersList = document.getElementById('playersList');
        const rows = playersList.getElementsByTagName('tr');
        for (let row of rows) {
            const playerIdCell = row.getElementsByTagName('td')[0];
            if (playerIdCell && playerIdCell.dataset.playerId == playerId) {
                const statusCell = row.getElementsByClassName('statusCell')[0];
                if (statusCell) {
                    statusCell.textContent = ready ? 'Ready' : 'Not Ready';
                    statusCell.style.color = ready ? 'green' : 'red';
                }
                break;
            }
        }
    }

    updatePlayerList() {

    }

    onClose(data) {
        console.log('Соединение закрыто');
    }

    onError(error) {
        console.error('Ошибка WebSocket: ', error);
    }

    close() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

export { ConnectionController };
