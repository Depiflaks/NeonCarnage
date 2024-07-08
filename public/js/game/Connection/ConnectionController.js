import { SERVER } from "../CONST.js";
import { EnemyController } from "../Engine/Enemy/EnemyController.js";

class ConnectionController {
    constructor() {
        // вебсокет у каждого свой... типа
        this.socket = new WebSocket(SERVER.sergey);
        this.enemies = {};
        this.initEventListeners();
    }

    setObj(player, field, enemies) {
        this.player = player;
        this.field = field;
        this.enemies = enemies;
    }

    sendPosition() {
        const {x, y} = this.player.getPosition();
        const angle = this.player.getAngle();
        const weapon = this.player.getWeaponId();
        const body = {
            player: {
                x: x - this.field.x, 
                y: y - this.field.y, 
                angle: angle, 
                weapon: weapon
            },
            damage: {}
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
        const player = body.player;
        const id = player.id;
        const x = player.x + this.field.x;
        const y = player.y + this.field.y;
        const angle = player.angle;
        const weapon = player.weapon

        if (this.enemies[id]) {
            // Если игрок существует, обновляем его координаты
            this.enemies[id].setPosition({
                x: x,
                y: y,
            });
            this.enemies[id].setAngle(angle);
            //console.log(x, y, angle);
        } else {
            // Если игрока нет, создаем нового и добавляем его в массив
            const enemy = new EnemyController({
                x: x,
                y: y,
                angle: angle,
                weaponId: weapon,
            });
            this.enemies[id] = enemy;
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
