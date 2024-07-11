import { SERVER, ENTITY } from "../CONST.js";
import { EnemyController } from "../Engine/Enemy/EnemyController.js";
import { Bullet } from "../Engine/Weapon/Bullet.js";

class ConnectionController {
    constructor() {
        // вебсокет у каждого свой... типа
        this.socket = new WebSocket(SERVER.ignat);
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
        const weaponId = this.player.getWeaponId();
        const weaponAmount = weaponId ? this.player.getWeapon().getAmount() : null;
        const corpse = this.field.getCorpse();
        const body = {
            player: {
                x: x - this.field.x, 
                y: y - this.field.y, 
                angle: this.player.getAngle(), 
                weapon: {
                    id: weaponId,
                    amount: weaponAmount,
                },
                health: this.player.getHealth(),
                maxHealth: ENTITY.maxHealth,
                isAlive: this.player.isAlive(),
                skinId: this.player.getSkinId()
            },
            bullets: [],
            change: {
                damage: this.player.getDamage(),
                heal: this.player.getHeal(),
            },
            // field: {
            //     corpse: corpse,
            // }

        }
        this.player.clearHeal();
        this.player.clearDamage();
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
        //console.log(2, body);
        body.objects.weapons.filter(weapon => {return weapon.id === body.objects.weaponId}).map(weapon => {
            this.field.weapons[weapon.id].update(weapon, {dx: this.field.x, dy: this.field.y});
        });
        for (const id in body.players) {
            const entity = body.players[id];
            if (entity == {}) continue; 
            if (id === this.id) {
                this.player.setHealth(entity.health);
                if (!entity.isAlive) {
                    this.field.addCorpse(this.player);
                    this.player.die();
                    
                }
                //здесь можно добавить призрака
                continue;
            };
            if (!this.enemies[id]) this.enemies[id] = new EnemyController({
                x: 0, y: 0, angle: 0, weaponId: null, skinId: entity.skinId, maxHealth: ENTITY.maxHealth,
                health: entity.health
            });
            const enemy = this.enemies[id];
            enemy.setPosition({
                x: entity.x + this.field.x,
                y: entity.y + this.field.y,
            });
            enemy.setAngle(entity.angle);
            enemy.setWeaponId(entity.weaponId);
            enemy.setHealth(entity.health);
            if (!entity.isAlive) {
                enemy.dieEnemy();
            }
            enemy.setBullets(entity.bullets.map(bullet => {
                return new Bullet({
                    x: bullet.x + this.field.x, 
                    y: bullet.y + this.field.y, 
                    angle: bullet.angle
                })
            }))
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
