import { Bullet } from "../../Engine/Weapon/Bullet/Bullet.js";
import { Corpse } from "../../Engine/Field/Components/Corpse.js";
import { EnemyController } from "../../Engine/Entity/Enemy/EnemyController.js";
import { ENTITY } from "../../CONST.js";

export class Responder {
    constructor(engine, socket) {
        this.player = engine.player;
        this.field = engine.field;
        this.enemies = engine.enemies;
        this.playerList = engine.model.playerList;
        this.socket = socket;
    }

    onInit(body) {
        this.id = body.id;
        this.socket.id = this.id
    }

    onResponse(body) {
        this.updateWeapons(body);
        this.updateCollectables(body);
        this.player.leaderBoard = body.leaderBoard;
        this.updateCorpses(body);
        this.updatePlayers(body);
        //this.updateBots(body.bots);
    }

    updateWeapons(body) {
        for (let id in body.objects.weapons) {
            this.field.weapons[id].update(body.objects.weapons[id], {dx: this.field.x, dy: this.field.y})
        }
    }

    updateCollectables(body) {
        for (const [id, aidKit] of body.objects.aidKits.entries()) {
            this.field.aidKits[id].active = aidKit;
        }
        for (const [id, ammunition] of body.objects.ammunitions.entries()) {
            this.field.ammunition[id].active = ammunition;
        }
    }

    updateCorpses(body) {
        for (let id in body.objects.corpses) {
            if (id === this.id) continue;
            this.field.corpses[id] = body.objects.corpses[id].map(corp => {return new Corpse(
                corp.x + this.field.x, 
                corp.y + this.field.y, 
                corp.skinId
            )})
        }
    }

    updatePlayers(body) {
        for (const id in body.players) {
            const entity = body.players[id];
            if (id === this.id) {
                this.updatePlayer(entity);
            } else {
                this.updateEnemy(entity, id);
            }
        }
    }

    updatePlayer(entity) {
        if (this.player.isAlive() && !entity.isAlive) {
            this.player.die();
            this.field.addCorpse(this.id, this.player);
        }
        if (!this.player.isAlive() && entity.isAlive) {
            this.player.reborn(this.field.getSpawnPoint());
        }
        this.player.setAlive(entity.isAlive);
        this.player.setHealth(entity.health);
        this.updateWeapon(this.player, entity);
    }

    updateEnemy(entity, id) {
        const {x, y} = {x: entity.x + this.field.x, y: entity.y + this.field.y}
        if (!this.enemies[id]) this.enemies[id] = this.newEnemy(entity)
        const enemy = this.enemies[id];
        enemy.setPosition({x, y});
        enemy.setAlive(entity.isAlive);
        enemy.setAngle(entity.angle);
        
        enemy.setHealth(entity.health);
        if (!entity.isAlive) enemy.die();

        if (entity.meleeStrike.isAnimating) {
            if (!enemy.getMeleeStrike()) enemy.createMeleeStrike();
            enemy.setMeleeStrike(entity.meleeStrike.angle, entity.meleeStrike.isAnimating, entity.meleeStrike.direction);
        } else {
            enemy.removeMeleeStrike();
        }
        this.updateWeapon(enemy, entity);
        enemy.setBullets(entity.bullets.map(bullet => {
            return new Bullet({
                x: bullet.x + this.field.x, 
                y: bullet.y + this.field.y, 
                angle: bullet.angle
            })
        }));
    }

    updateWeapon(player, entity) {
        player.setWeaponId(entity.weaponId);
        player.setWeapon(this.field.weapons[entity.weaponId]);
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

    newEnemy(entity) {
        const {x, y} = {x: entity.x + this.field.x, y: entity.y + this.field.y}
        return new EnemyController({
            x: x, y: y, angle: 0, weaponId: null, skinId: entity.skinId, maxHealth: ENTITY.maxHealth,
            health: entity.health, nickName: entity.nickname,
        });
    }
}