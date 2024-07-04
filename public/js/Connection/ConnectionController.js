import { SERVER, WINDOW } from "../CONST.js";
import { PlayerController } from '../Player/PlayerController.js';
import { GameModel } from "../Game/GameModel.js";
import { GameController } from "../Game/GameController.js";

class ConnectionController {
    constructor(canvas) {
        // вебсокет у каждого свой... типа
        this.socket = new WebSocket(SERVER.ignat);
        this.initEventListeners();
        this.players = [];
        this.canvas = canvas;
        canvas.width = WINDOW.w;
        canvas.height = WINDOW.h;
        this.context = canvas.getContext("2d");
    }

    sendPosition(x, y) {
        if (this.socket.readyState === WebSocket.OPEN) {
            const data = JSON.stringify({ type: "request", x: x, y: y });
            this.socket.send(data);
        }
    }

    async initEventListeners() {
        this.socket.addEventListener('open', async () => {await this.onOpen()});
    
        this.socket.addEventListener('message', async ({ data }) => {await this.onMessage(data)});
    
        this.socket.addEventListener('close', () => {
            console.log('Соединение закрыто');
        });
    
        this.socket.addEventListener('error', (error) => {
            console.error('Ошибка WebSocket: ', error);
        });
    }

    async onOpen() {

        console.log('Соединение установлено');
        if (this.socket.readyState === WebSocket.OPEN) {
            const data = JSON.stringify({ type: "init" });
            this.socket.send(data);
        }
    
    }

    async onMessage(data) {
        const change = JSON.parse(data);

        const dataType = change.type;

        if(dataType == "response") {
            const playerId = change.id;
            const playerX = change.x + this.field.x;
            const playerY = change.y + this.field.y;

            console.log(change);

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
        }
        else {
            console.log(change.data.map);
            const cellsList = change.data.map.cells;
            const wallsList = change.data.map.walls;
            const weaponList = change.data.map.weapons;
            const player = change.data.map.player;
            const initData = {cellsList, wallsList, weaponList};
            console.log(initData);
            this.gameModel = new GameModel(initData);
            this.field = this.gameModel.getField();
            const gameController = new GameController(  
                this.canvas, this.context, this, initData, player
            );
            
            gameController.loop();

        }
    }

    getPlayers() {
        return this.players;
    }
}

export { ConnectionController };
