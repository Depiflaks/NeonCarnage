import { SERVER, ENTITY } from "../CONST.js";
import { EnemyController } from "../Engine/Enemy/EnemyController.js";
import { Bullet } from "../Engine/Weapon/Bullet.js";

class ConnectionController {
    constructor() {
        // вебсокет у каждого свой... типа
        this.socket = new WebSocket(SERVER.sergey_home);
        this.enemies = {};
        this.initEventListeners();
    }

    setObj(player, field, enemies) {
        this.player = player;
        this.field = field;
        this.enemies = enemies;
    }

    sendData() {
        const {x, y} = this.player.getPosition();
        const angle = this.player.getAngle();
        const weapon = this.player.getWeaponId();
        const health = this.player.getHealth();
        const maxHealth = ENTITY.maxHealth;
        const damage = this.player.model.damage;
        const isAlive = this.player.isAlive();
        this.player.model.damage = {};
        const body = {
            player: {
                x: x - this.field.x, 
                y: y - this.field.y, 
                angle: angle, 
                weapon: weapon,
                health: health,
                maxHealth: maxHealth,
                isAlive: isAlive,
                skinId: this.player.getSkinId()
            },
            bullets: [],
            damage: damage,
        }
        body.bullets = this.player.getBullets().map(bullet => {
            const {x, y} = bullet.getPosition();
            return {
                x: x - this.field.x, 
                y: y - this.field.y, 
                angle: bullet.getAngle()};
        })
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
                this.init(body)
                break;
            case "response":
                this.response(body);
                break
            default:
                break;
        }
    }

    init(body) {
        this.id = body.id;
    }

    response(body) {
        for (const id in body.players) {
            const entity = body.players[id];
            if (id === this.id) continue;
            if (!this.enemies[id]) this.enemies[id] = new EnemyController({
                x: 0, y: 0, angle: 0, weaponId: null, skinId: entity.skinId,
            });
            const enemy = this.enemies[id];
            if (!entity.isAlive) {
                enemy.die();
            }
            enemy.setPosition({
                x: entity.x + this.field.x,
                y: entity.y + this.field.y,
            });
            enemy.setAngle(entity.angle);
            enemy.setWeaponId(entity.weapon);
            enemy.setHealth(entity.health);
            // enemy.setBullets(body.bullets.map(bullet => {
            //     return new Bullet({
            //         x: bullet.x + this.field.x, 
            //         y: bullet.y + this.field.y, 
            //         angle: bullet.angle
            //     })
            // }))
        }
        // const player = body.player;
        // const id = player.id;
        // const x = player.x + this.field.x;
        // const y = player.y + this.field.y;
        // const health = player.health;
        // const maxHealth = player.maxHealth;
        // const currentHealth = this.player.getHealth();
        // const isAlive = player.isAlive;
        // this.player.model.health -= body.damage.damage;
        // this.player.model.health = Math.max(this.player.model.health, 0);
        
    }

    onClose(data) {
        console.log('Соединение закрыто');
    }

    onError(error) {
        console.error('Ошибка WebSocket: ', error);
    }

}

export { ConnectionController };
