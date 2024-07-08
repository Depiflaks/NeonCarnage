import { SERVER } from "../CONST.js";
import { EnemyController } from "../Engine/Enemy/EnemyController.js";

class ConnectionController {
    constructor(player, enemies, field) {
        // вебсокет у каждого свой... типа
        this.initEventListeners();
        this.player = player;
        this.enemies = enemies;
        this.field = field;
    }

    sendPosition({x, y, angle}) {
        const body = {
            x: x,
            y: y,
            angle: angle,
        }
        this.send("update", body);
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
    
        this.socket.addEventListener('message', ({ data }) => {this.onMessage(JSON.parse(data))});
    
        this.socket.addEventListener('close', ({ data }) => {this.onClose(data)});
    
        this.socket.addEventListener('error', (error) => {this.onError(error)});
    }

    onOpen(data) {
        console.log('Соединение установлено');
    }

    onMessage(data) {
        const type = data.type;
        const body = data.body;
        switch (type) {
            case "init":
                this.init()
                break;
            case "response":
                this.response(body);
                break
            default:
                break;
        }
    }

    init() {
        console.log(body)
    }

    response(body) {
        const enemyId = body.id;

        const enemyX = body.x + this.field.x;
        const enemyY = body.y + this.field.y;
        const enemyAngle = body.angle;

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
