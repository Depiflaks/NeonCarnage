import { Bullet } from "../../Engine/Weapon/Bullet/Bullet.js";
import { Corpse } from "../../Engine/Field/Components/Corpse.js";
import { EnemyController } from "../../Engine/Entity/Enemy/EnemyController.js";
import { ENTITY, GAME_MODE } from "../../CONST.js";
import {BotController} from "../../Engine/Entity/Bot/BotController.js";

export class Responder {
    constructor(engine, socket) {
        this.player = engine.player;
        this.field = engine.field;
        this.enemies = engine.enemies;
        this.playerList = engine.model.playerList;
        this.bots = engine.bots;
        this.socket = socket;
        this.mode = engine.model.mode;
        if (this.mode.area) this.area = engine.model.area;
    }

    onInit(body) {
        this.id = body.id;
        this.spawnPoint = body.spawnPoint;
        let x = this.spawnPoint.x + this.field.x;
        let y = this.spawnPoint.y + this.field.y;
        this.player.reborn({x, y});
        this.socket.id = this.id
    }

    onEnd() {
        window.location.href = `/lobby`
    }

    onResponse(body) {
        this.updateWeapons(body);
        this.updateCollectables(body);
        this.player.leaderBoard = body.leaderBoard;
        this.updateCorpses(body);
        this.updatePlayers(body);
        if (this.mode.area) this.updateArea(body);
        //console.log(body.bots)
        this.updateBots(body.bots);
        if (this.mode.timer) this.updateTimer(body);
    }

    updateTimer(body) {
        this.field.timer = body.timer;
    }

    updateArea(body) {
        this.area.radiusFact = body.area.radius;
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
            if (this.field.corpses[this.id].length === 10) {
                this.field.corpses[this.id] = this.field.corpses[this.id].slice(5);
            }
        }
        if (!this.player.isAlive() && entity.isAlive) {
            let x = entity.spawnPoint.x + this.field.x;
            let y = entity.spawnPoint.y + this.field.y;
            this.player.reborn({x, y});
        }
        this.player.setAlive(entity.isAlive);
        this.player.setHealth(entity.health);
        this.updateWeapon(this.player, entity);
        //this.player.clearVisibleBots();
        //this.player.model.visibleBots = entity.visibleBots;
    }

    updateEnemy(entity, id) {
        const {x, y} = {x: entity.x + this.field.x, y: entity.y + this.field.y}
        if (!this.enemies[id]) this.enemies[id] = this.newEnemy(entity)
        const enemy = this.enemies[id];
        enemy.setPosition({x, y});
        enemy.setVisible(entity.visible)
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
        bots.forEach((bot, index) => {
            const id = bot.id;

            if (!this.bots[id]) {
                this.bots[id] = this.newBot(bot);
            } else {
                const botController = this.bots[id];
                botController.setShooting(bot.shooting);
                botController.setAlive(bot.isAlive);
                botController.setHealth(bot.health);
                botController.setAngle(bot.angle);
            }
        });
        //console.log(this.bots)
    }

    newEnemy(entity) {
        const {x, y} = {x: entity.x + this.field.x, y: entity.y + this.field.y}
        return new EnemyController({
            x: x, y: y, angle: 0, weaponId: null, skinId: entity.skinId, maxHealth: ENTITY.maxHealth,
            health: entity.health, nickName: entity.nickname,
        });
    }

    newBot(entity) {
        const {x, y} = {x: entity.current.x + this.field.x, y: entity.current.y + this.field.y}
        return new BotController({
            x: x, y: y, angle: 0, weaponId: null, skinId: entity.skinId, maxHealth: ENTITY.maxHealth,
            health: entity.health, id: entity.id, shooting: entity.shooting, isAlive: entity.isAlive,
        })
    }
}