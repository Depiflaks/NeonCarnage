import { SERVER, ENTITY, WEAPON_STATE } from "../CONST.js";
import { Corpse } from "../Engine/Field/Components/Corpse.js";
import { EnemyController } from "../Engine/Entity/Enemy/EnemyController.js";
import { Bullet } from "../Engine/Weapon/Bullet/Bullet.js";

class ConnectionController {
    constructor() {
        // вебсокет у каждого свой... типа
        this.socket = new WebSocket(SERVER.denis);
        this.enemies = {};
        this.bots = {}; // Хранение данных о ботах
        this.initEventListeners();
    }

    setObj(player, field, enemies, playerList) {
        this.player = player;
        this.field = field;
        this.enemies = enemies;
        this.playerList = playerList;
    }

    sendData() {
        const {x, y} = this.player.getPosition();
        const body = {
            player: {
                x: x - this.field.x, 
                y: y - this.field.y, 
                angle: this.player.getAngle(), 
                health: this.player.getHealth(),
                maxHealth: ENTITY.maxHealth,
                skinId: this.player.getSkinId(),
                nickname: this.player.getNickname(),
                isReborning: this.player.isReborning(),
                meleeStrike: {
                    isAnimating: this.player.getIsAnimating(),
                    direction: this.player.getDirection(),
                    angle: this.player.getCurrentAngle(),
                }
            },
            bullets: [],
            change: {
                damage: this.player.getDamage(),
                heal: this.player.getHeal(),
                amount: this.player.getAmount(),
                weapon: {
                    id: this.player.getChangeWeapon().id,
                    state: this.player.getChangeWeapon().state
                },
            },
            field: {
                corpses: [],
                bots: Object.keys(this.bots).map(botId => ({
                    id: botId,
                    current: this.bots[botId].current,
                    skinId: this.bots[botId].skinId
                }))
            }
        }
        this.player.clearHeal();
        this.player.clearDamage();
        this.player.clearAmount();
        this.player.clearChangeWeapon();
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
        //console.log(body.change.weapon);
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
                this.onResponse(body);
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
            //console.log(this.field.weapons);
            //console.log(enemy.model);
            enemy.setBullets(entity.bullets.map(bullet => {
                return new Bullet({
                    x: bullet.x + this.field.x,
                    y: bullet.y + this.field.y,
                    angle: bullet.angle
                })
            }));
        }

        this.updateBots(body.bots);
    }

    updateBots(bots) {
        if (!Array.isArray(bots)) {
            console.error('Bots data is not an array:', bots);
            return;
        }

        // Очистка старых данных о ботах
        this.bots = {};

        // Обработка новых данных о ботах
        for (const botData of bots) {
            const botId = botData.id;
            const {x, y} = {x: botData.current.x + this.field.x, y: botData.current.y + this.field.y};

            // Обновляем информацию о боте
            if (!this.bots[botId]) {
                this.bots[botId] = {
                    current: { x, y },
                    skinId: botData.skinId
                };
            } else {
                this.bots[botId].current = { x, y };
                this.bots[botId].skinId = botData.skinId;
            }

            // Добавляем видимого бота в модель игрока
            this.player.addVisibleBot(botId);
        }

        // Очистка списка видимых ботов игрока, если необходимо
        this.player.getVisibleBots().forEach(botId => {
            if (!this.bots[botId]) {
                this.player.clearVisibleBots();
            }
        });
    }
    onClose(data) {
        console.log('Соединение закрыто');
    }

    onError(error) {
        console.error('Ошибка WebSocket: ', error);
    }

}

export { ConnectionController };