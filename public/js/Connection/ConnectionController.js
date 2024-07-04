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

    sendPosition({x, y, angle}) {
        //console.log(x, y)
        if (this.socket.readyState === WebSocket.OPEN) {
            //console.log(x, y, angle)
            const data = JSON.stringify({ x, y, angle });
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
        //console.log(change);
        const enemyId = change.id;

        const enemyX = change.x + this.field.x;
        const enemyY = change.y + this.field.y;
        const enemyAngle = change.angle;

        if (this.enemies[enemyId]) {
            // Если игрок существует, обновляем его координаты
            this.enemies[enemyId].setPosition({
                x: enemyX,
                y: enemyY,
            });
            this.enemies[enemyId].setAngle(enemyAngle);
            //console.log(enemyX, enemyY, enemyAngle);
        } else {
            // Если игрока нет, создаем нового и добавляем его в массив
            const enemy = new EnemyController({
                x: enemyX,
                y: enemyY,
                angle: enemyAngle,
            });
            this.enemies[enemyId] = enemy;
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
