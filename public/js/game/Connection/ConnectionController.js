import { SERVER, ENTITY } from "../CONST.js";
import { EnemyController } from "../Engine/Enemy/EnemyController.js";

class ConnectionController {
    constructor(player, enemies, field) {
        // вебсокет у каждого свой... типа
<<<<<<< Updated upstream
        this.socket = new WebSocket(SERVER.sergey);
=======
        this.socket = new WebSocket(SERVER.ignat);
        this.enemies = {};
>>>>>>> Stashed changes
        this.initEventListeners();
        this.player = player;
        this.enemies = enemies;
        this.field = field;
    }

<<<<<<< Updated upstream
    sendPosition({x, y, angle}) {
        const body = {
            x: x,
            y: y,
            angle: angle,
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        const enemyId = body.id;
=======
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
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
                x: enemyX,
                y: enemyY,
                angle: enemyAngle,
=======
                x: x,
                y: y,
                angle: angle,
                weaponId: weapon,
                health: health,
                maxHealth: maxHealth
>>>>>>> Stashed changes
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
