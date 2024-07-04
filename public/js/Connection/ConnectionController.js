import { SERVER } from "../CONST.js";
import { EnemyController } from "../Enemy/EnemyController.js";

class ConnectionController {
    constructor(player, enemies, field, context) {
        // вебсокет у каждого свой... типа
        this.socket = new WebSocket(SERVER.sergey);
        this.initEventListeners();
        this.player = player;
        this.enemies = enemies;
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
        this.socket.addEventListener('open', ({ data }) => {this.onOpen(data)});
    
        this.socket.addEventListener('message', ({ data }) => {this.onMessage(data)});
    
        this.socket.addEventListener('close', ({ data }) => {this.onClose(data)});
    
        this.socket.addEventListener('error', (error) => {this.onError(error)});
    }

    onOpen(data) {
        console.log('Соединение установлено');
    }

    onMessage(data) {
        const change = JSON.parse(data);
        const enemyId = change.id;

        const enemyX = change.x + this.field.x;
        const enemyY = change.y + this.field.y;
        const enemyAngle = change.angle;

        // Найти индекс игрока по id
        const playerIndex = this.enemies.findIndex(enemy => enemy.id === enemyId);

        if (playerIndex !== -1) {
            // Если игрок существует, обновляем его координаты
            this.enemies[enemyId].sendPosition({
                x: enemyX,
                y: enemyY,
            });
        } else {
            // Если игрока нет, создаем нового и добавляем его в массив
            const enemy = new EnemyController({
                x: enemyX,
                y: enemyY,
                angle: enemyAngle,
            });
            this.enemies.push({
                id: enemyId,
                player: player
            });
        }
    }

    onClose(data) {
        console.log('Соединение закрыто');
    }

    onError(error) {
        console.error('Ошибка WebSocket: ', error);
    }

}

export { ConnectionController };
