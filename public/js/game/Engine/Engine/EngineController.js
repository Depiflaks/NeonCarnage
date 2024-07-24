import {CAMERA, KEYBOARD_E, KEYBOARD_F, MELEE_STRIKE, SOUND, WEAPON, WEAPON_STATE} from "../../CONST.js";
import { EngineModel } from "./EngineModel.js";
import { EngineView } from "./EngineView.js";
import { Tracing } from "../RayTracing/Tracing.js";
import { ConnectionController } from "../../Connection/ConnectionController.js";
import { EntityController } from "../Entity/EntityController.js";
import { SoundController } from "../SoundController/SoundController.js";

class EngineController {
    /**
     * 
     * @param {Array} objects 
     * @param {ConnectionController} connection 
     * @param {canvas} canvas 
     */
    constructor(objects, connection, canvas) {
        this.soundController = new SoundController();
        this.soundController.init(SOUND);
        this.model = new EngineModel(objects, this.soundController);
        this.view = new EngineView(canvas);
        this.enemies = this.model.getEnemies();
        this.field = this.model.getField();
        this.player = this.model.getPlayer();
        this.bots = this.model.getBots();
        this.tracing = new Tracing(this.player, this.field);

        this.connection = connection;
        this.initEventListeners(canvas);
    }

    move() {
        const { x, y } = this.player.getPosition();
        const [dx, dy] = [
            Math.round(CAMERA.center.x - x),
            Math.round(CAMERA.center.y - y)
        ];
        const period = CAMERA.period;
        this.field.move(dx / period, dy / period);
        this.player.move(dx / period, dy / period);
        Object.values(this.enemies).forEach(enemy => {
            enemy.move(dx / period, dy / period);
        });
        Object.values(this.bots).forEach(bot => {
            bot.move(dx / period, dy / period);
        });
        Object.values(this.bots).forEach(bot => {
            Object.values(bot.getBullets()).forEach(bullet => {
                bullet.move(dx / period, dy / period);
            });
        });
        this.model.area.move(dx / period, dy / period);
    }

    pickUpWeapon() {
        const { x, y } = this.player.getPosition();
        Object.values(this.field.weapons).forEach(weapon => {
            const distance = Math.sqrt((weapon.model.x - x) ** 2 + (weapon.model.y - y) ** 2);
            if (weapon.getStatus() === WEAPON_STATE.onTheGround && distance <= WEAPON.minDistance && !this.player.getWeapon()) {
                this.player.pickUpWeapon(weapon);
            }
        });
    }

    update() {
        this.soundController.updateSounds();
        this.field.update();
        this.tracing.updateViewRange();
        Object.values(this.enemies).forEach(enemy => {
            enemy.checkActive(this.field);
            enemy.getBullets().forEach(bullet => {
                bullet.updatePosition();
            });
            this.updateEnemyMeleeStrike(enemy);
            enemy.update();
        })
        Object.values(this.bots).forEach(bot => {
            bot.checkActive(this.field);
            if (bot.isActive()) {
                this.player.addVisibleBot(bot.model.id);
            } else {
                this.player.removeVisibleBot(bot.model.id);
            }
            if (bot.getShooting()) {
                //console.log(bot.getShooting())
                bot.shot();
            }
            bot.getBullets().forEach(bullet => {
                bullet.updatePosition();
            });
            //console.log(this.player.getVisibleBots());
        });
        this.checkIntersections([...this.field.verticalWalls, ...this.field.horizontalWalls]);
        this.takeAmmunition();
        this.takeAidKit();
        this.player.update();

        this.move();
        this.model.updateShake();
    }

    /**
     * 
     * @param {EntityController} enemy 
     */
    updateEnemyMeleeStrike(enemy) {
        if (enemy.getMeleeStrike()) {
            enemy.setMeleeStrikePosition(enemy.getPosition());
            enemy.setMeleeStrikeAngle(enemy.getAngle());
        }
    }

    takeAmmunition() {
        const weapon = this.player.getWeapon();
        for (const [index, ammunition] of this.field.ammunition.entries()) {
            if (ammunition.active && weapon && weapon.isDistant()) {
                weapon.pickupAmmunition(index, ammunition, this.player);
            }
        }
    }

    takeAidKit() {
        for (const [index, aidKit] of this.field.aidKits.entries()) {
            if (aidKit.active) 
                this.player.pickupAidKit(index, aidKit)
        }
    }

    /**
     * 
     * @param {Array} barriers 
     */
    bulletsIntersectionWall(barriers) {
        this.player.setBullets(this.player.getBullets().filter(bullet => {
            bullet.updatePosition();
            return !barriers.some(barrier => bullet.isIntersectLines(barrier));
        }));
        Object.values(this.bots).forEach(bot => {
            bot.setBullets(bot.getBullets().filter(bullet => {
                return !barriers.some(barrier => bullet.isIntersectLines(barrier));
            }));
        })
    }

    filterBullets(bullets, enemies, addDamage) {
        return bullets.filter(bullet => {
            let hit = false;
            Object.entries(enemies).forEach(([id, enemy]) => {
                if (enemy.isAlive() && bullet.isIntersectEnemy(enemy.model)) {
                    hit = true;
                    addDamage(id, 1);
                }
            });
            return !hit;
        });
    }

    bulletsIntersectionEnemy() {
        this.player.setBullets(this.filterBullets(
            this.player.getBullets(),
            this.enemies,
            (id, damage) => this.player.addDamage(id, damage)
        ));

        Object.values(this.bots).forEach(bot => {
            bot.setBullets(this.filterBullets(
                bot.getBullets(),
                this.enemies,
                (id, damage) => this.player.addDamage(id, damage)
            ));
        });
    }
    /**
     *
     * @param {Array} drawableArray
     * @returns
     */
    meleeStrikeIntersectionEnemy(drawableArray) {
        const meleeStrike = this.player.getMeleeStrike();
        if (!meleeStrike) return;
        const currentTime = Date.now();
        Object.entries(this.enemies).forEach(([id, enemy]) => {
            if (enemy.isAlive() && meleeStrike.isIntersectEnemy(enemy.model) && !this.intersectMeleeStrike(drawableArray)) {
                if (currentTime - enemy.getLastHitTime() >= 1000) { // Проверка на интервал 1 секунда
                    this.player.addDamage(id, 5);
                    enemy.setLastHitTime(currentTime); // Обновляем время последнего удара
                    //this.player.getMeleeStrike().weaponLeft.src = MELEE_STRIKE.knifeLeftBloodyImage;
                    //this.player.getMeleeStrike().weaponRight.src = MELEE_STRIKE.knifeRightBloodyImage;
                }
            }
        });
    }

    /**
     * 
     * @param {Array} drawableArray 
     * @param {Array} moveableArray 
     */
    checkIntersections(drawableArray, moveableArray) {
        this.bulletsIntersectionWall(drawableArray);
        this.bulletsIntersectionEnemy(moveableArray);
        this.meleeStrikeIntersectionEnemy(drawableArray)
        this.intersectMeleeStrike(drawableArray);
        drawableArray.forEach(obj => {
            this.player.check(obj);
        });
    }

    /**
     * 
     * @param {Array} walls 
     * @returns {boolean}
     */
    intersectMeleeStrike(walls) {
        if (!this.player.getMeleeStrike()) return false;
        for (const wall of walls) {
            if (this.player.getMeleeStrike().isIntersect(wall)) {
                if (!this.player.getIsStriking()) {
                    this.player.removeMeleeStrike();
                } else {
                    this.player.setStacked(true);
                }
                return true;
            }
        }
        return false;
    }

    /**
     * 
     * @param {canvas} canvas 
     */
    initEventListeners(canvas) {
        addEventListener("keydown", event => this.keyDown(event));
        addEventListener("keyup", event => this.keyUp(event));
        canvas.addEventListener('contextmenu', event => {
            event.preventDefault(); // Отключаем контекстное меню при правом клике
        });
        addEventListener('mousemove', () => {
            if (!this.soundController.isPlaying) {
                this.soundController.playTrack('background');
                this.soundController.isPlaying = true;
            }
        });
    }

    /**
     * 
     * @param {Object} event 
     */
    keyDown(event) {
        if (event.code === KEYBOARD_E && this.player.isAlive() && !this.player.getWeapon()) {
            this.pickUpWeapon();
        } else if (event.code === KEYBOARD_E) {
            this.player.setStacked(false);
            this.player.throwWeapon();
            if (this.player.getMeleeStrike()) {
                this.player.setAnimating(false);
                this.player.removeMeleeStrike();
            }
        }
        if (event.code === KEYBOARD_F) {
            this.model.leaderBoard = true;
            this.soundController.setVolume(0.4);
        }
    }

    /**
     * 
     * @param {Object} event 
     */
    keyUp(event) {
        if (event.code === KEYBOARD_F) {
            this.model.leaderBoard = false;
            this.soundController.setVolume(1.0);
        }
    }

    nextFrame() {
        this.update();
        this.view.update(this.field, this.player, this.enemies, this.bots, this.player.leaderBoard, this.model.leaderBoard, this.model.isShaking(), this.model.area);
    }
}

export { EngineController };
