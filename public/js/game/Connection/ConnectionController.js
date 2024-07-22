import { SERVER } from "../CONST.js";
import { Responder } from "./Responder/Responder.js";
import { Sender } from "./Sender/Sender.js";

class ConnectionController {
    constructor() {
        // вебсокет у каждого свой... типа
        this.socket = new WebSocket(SERVER.denis_home);
        this.enemies = {};
        
        this.sender = new Sender(this.socket);
        this.initEventListeners();
    }

    initResponder(engine) {
        this.responder = new Responder(engine, this.socket);
    }

    send(player, field) {
        this.sender.sendData(player, field);
    }

    initEventListeners() {
        this.socket.addEventListener('open', ({ data }) => {this.onOpen()});
    
        this.socket.addEventListener('message', ({ data }) => {this.onMessage(JSON.parse(data))});

        this.socket.addEventListener('close', ({ data }) => {this.onClose(data)});

        this.socket.addEventListener('error', (error) => {this.onError(error)});
    }

    onOpen() {
        console.log('Соединение установлено');
    }

    onMessage(data) {
        const type = data.type;
        const body = data.body;
        switch (type) {
            case "init":
                this.responder.onInit(body)
                break;
            case "response":
                this.responder.onResponse(body);
                break
            default:
                break;
        }
    }

    init(body) {
        this.id = body.id;
    }

    onResponse(body) {
        for (let id in body.objects.weapons) {
            this.field.weapons[id].update(body.objects.weapons[id], {dx: this.field.x, dy: this.field.y})
        }
        for (const [id, aidKit] of body.objects.aidKits.entries()) {
            this.field.aidKits[id].active = aidKit;
        }
        for (const [id, ammunition] of body.objects.ammunitions.entries()) {
            this.field.ammunition[id].active = ammunition;
        }
        this.player.leaderBoard = body.leaderBoard;
        for (let id in body.objects.corpses) {
            if (id === this.id) continue;
            this.field.corpses[id] = body.objects.corpses[id].map(corp => {return new Corpse(
                corp.x + this.field.x,
                corp.y + this.field.y,
                corp.skinId
            )})
        }
        for (const id in body.players) {
            const entity = body.players[id];
            if (id === this.id) {
                this.player.setAlive(entity.isAlive);
                this.player.setHealth(entity.health);
                if (!entity.isAlive && !entity.isReborning && !this.player.isReborning()) {
                    this.field.addCorpse(this.id, this.player);
                    //console.log(this.field.getCorpses());
                    this.player.die(this.field.getSpawnPoint());
                }
                this.player.setWeaponId(entity.weaponId);
                this.player.setWeapon(this.field.weapons[entity.weaponId]);
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
            
            enemy.setHealth(entity.health);
            enemy.setNickname(entity.nickname);
            if (entity.meleeStrike.isAnimating) {
                if (!enemy.getMeleeStrike()) {
                    enemy.createMeleeStrike();
                } else {
                    enemy.setMeleeStrike(entity.meleeStrike.angle, entity.meleeStrike.isAnimating, entity.meleeStrike.direction);
                }
            } else {
                enemy.removeMeleeStrike();
            }

            if (!entity.isAlive) {
                enemy.die();
            }
            enemy.setWeaponId(entity.weaponId);
            enemy.setWeapon(this.field.weapons[entity.weaponId]);
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