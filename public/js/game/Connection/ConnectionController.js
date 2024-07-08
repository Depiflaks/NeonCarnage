import { SERVER, ENTITY } from "../CONST.js";
import { EnemyController } from "../Engine/Enemy/EnemyController.js";

class ConnectionController {
    constructor(player, enemies, field) {
        // вебсокет у каждого свой... типа
        this.socket = new WebSocket(SERVER.ignat);
        this.enemies = {};
        this.initEventListeners();
        this.player = player;
        this.enemies = enemies;
        this.field = field;
    }

    sendData() {
        const {x, y} = this.player.getPosition();
        const angle = this.player.getAngle();
        const weapon = this.player.getWeaponId();
        const health = ENTITY.health;
        const maxHealth = ENTITY.maxHealth;
        const damage = this.player.model.damage;
        this.player.model.damage = {};
        const body = {
            player: {
                x: x - this.field.x, 
                y: y - this.field.y, 
                angle: angle, 
                weapon: weapon,
                health: health,
                maxHealth: maxHealth
            },
            bullets: [],
            damage: damage,
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
        const weapon = player.weapon;
        const health = player.health;
        const maxHealth = player.maxHealth;
        const currentHealth = this.player.getHealth();
        this.player.model.health -= body.damage.damage;

        if (this.enemies[id]) {
            // Если игрок существует, обновляем его координаты
            this.enemies[id].setPosition({
                x: x,
                y: y,
            });
            this.enemies[id].setAngle(enemyAngle);
            //console.log(enemyX, enemyY, enemyAngle);
        } else {
            // Если игрока нет, создаем нового и добавляем его в массив
            const enemy = new EnemyController({
                x: x,
                y: y,
                angle: angle,
                weaponId: weapon,
                health: health,
                maxHealth: maxHealth
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
