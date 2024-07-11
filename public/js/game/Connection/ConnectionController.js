import { SERVER, ENTITY } from "../CONST.js";
import { Corpse } from "../Engine/BattleGround/Corpse.js";
import { EnemyController } from "../Engine/Enemy/EnemyController.js";
import { Bullet } from "../Engine/Weapon/Bullet.js";

class ConnectionController {
    constructor() {
        // вебсокет у каждого свой... типа
        this.socket = new WebSocket(SERVER.denis);
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
                skinId: this.player.getSkinId(),
                nickname: this.player.getNickname(),
                isReborning: this.player.isReborning(),
            },
            bullets: [],
            change: {
                damage: this.player.getDamage(),
                heal: this.player.getHeal(),
            },
            field: {
                corpses: [],
            }
        }
        this.player.clearHeal();
        this.player.clearDamage();
        if (this.field.getCorpses()[this.id]) body.field.corpses = this.field.getCorpses()[this.id].map(corp => {return {
            x: corp.x - this.field.x,
            y: corp.y - this.field.y,
            skinId: corp.skinId,
        }})
        body.bullets = this.player.getBullets().map(bullet => {
            const {x, y} = bullet.getPosition();
            return {
                x: x - this.field.x, 
                y: y - this.field.y, 
                angle: bullet.getAngle()
            };
        })
        //console.log(this.field.getCorpses());
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
        body.objects.weapons.filter(weapon => {return weapon.id === body.objects.weaponId}).map(weapon => {
            this.field.weapons[weapon.id].update(weapon, {dx: this.field.x, dy: this.field.y});
        });
        //console.log(body);
        // for (let id in body.objects.corpses) {
        //     this.field.corpses[id] = body.objects.corpses[id].map(corp => {return new Corpse(
        //         corp.x + this.field.x, 
        //         corp.y + this.field.y, 
        //         corp.skinId
        //     )})
        // }
        //console.log(this.field.corpses);
        for (const id in body.players) {
            const entity = body.players[id];
            if (id === this.id) {
                this.player.setAlive(entity.isAlive);
                this.player.setHealth(entity.health);
                if (!entity.isAlive && !entity.isReborning && !this.player.isReborning()) {
                    //this.field.addCorpse(this.id, this.player);
                    this.player.die(this.field.getSpawnPoint());
                }
                continue;
            };
            const {x, y} = {x: entity.x + this.field.x, y: entity.y + this.field.y}
            if (!this.enemies[id]) this.enemies[id] = new EnemyController({
                x: x, y: y, angle: 0, weaponId: null, skinId: entity.skinId, maxHealth: ENTITY.maxHealth,
                health: entity.health
            });
            const enemy = this.enemies[id];
            enemy.setPosition({x, y});
            enemy.setAlive(entity.isAlive);
            enemy.setAngle(entity.angle);
            enemy.setWeaponId(entity.weaponId);
            enemy.setHealth(entity.health);
            enemy.setNickname(entity.nickname);
            if (!entity.isAlive) {
                enemy.die();
            }
            enemy.setBullets(entity.bullets.map(bullet => {
                return new Bullet({
                    x: bullet.x + this.field.x, 
                    y: bullet.y + this.field.y, 
                    angle: bullet.angle
                })
            }));
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
