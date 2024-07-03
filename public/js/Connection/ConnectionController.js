import { SERVER } from "../CONST.js";
import { PlayerController } from '../Player/PlayerController.js';

class ConnectionController {
    constructor(players, field, context) {
        // вебсокет у каждого свой... типа
        this.socket = new WebSocket(SERVER.sergey);
        this.initEventListeners();
        this.players = players;
        this.field = field;
        this.context = context;
    }

    sendPosition(x, y) {
        if (this.socket.readyState === WebSocket.OPEN) {
            const data = JSON.stringify({ x, y });
            this.socket.send(data);
        }
    }

    initEventListeners() {
        this.socket.addEventListener('open', ({ data }) => {
            console.log('Соединение установлено');
        });
    
        this.socket.addEventListener('message', ({ data }) => {

            const change = JSON.parse(data);
            const playerId = change.id;
            const playerX = change.x + this.field.x;
            const playerY = change.y + this.field.y;

            // Найти индекс игрока по id
            const playerIndex = this.players.findIndex(player => player.id === playerId);

            if (playerIndex !== -1) {
                // Если игрок существует, обновляем его координаты
                this.players[playerIndex].player.model.x = playerX;
                this.players[playerIndex].player.model.y = playerY;
            } else {
                // Если игрока нет, создаем нового и добавляем его в массив
                const player = new PlayerController(this.context, { playerX, playerY });
                const newPlayer = {
                    id: playerId,
                    player: player
                };
                this.players.push(newPlayer);
            }
        });
    
        this.socket.addEventListener('close', ({ data }) => {
            console.log('Соединение закрыто');
        });
    
        this.socket.addEventListener('error', (error) => {
            console.error('Ошибка WebSocket: ', error);
        });
    }
}

export { ConnectionController };
