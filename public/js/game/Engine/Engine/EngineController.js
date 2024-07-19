import {CAMERA, KEYBOARD_E, KEYBOARD_F, MELEE_STRIKE, WEAPON, WEAPON_STATE} from "../../CONST.js";
import { EngineModel } from "./EngineModel.js";
import { EngineView } from "./EngineView.js";
import { Tracing } from "../RayTracing/Tracing.js";
import { ConnectionController } from "../../Connection/ConnectionController.js";
import { EntityController } from "../Entity/EntityController.js";

class EngineController {
    /**
     * 
     * @param {Array} objects 
     * @param {ConnectionController} connection 
     * @param {canvas} canvas 
     */
    constructor(objects, connection, canvas) {
        this.model = new EngineModel(objects);
        this.view = new EngineView(canvas);

        this.enemies = this.model.getEnemies();
        this.field = this.model.getField();
        this.player = this.model.getPlayer();
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
    }

    addWeapon() {
        const { x, y } = this.player.getPosition();
        Object.values(this.field.weapons).forEach(weapon => {
            const distance = Math.sqrt((weapon.model.x - x) ** 2 + (weapon.model.y - y) ** 2);
            if (weapon.getStatus() === WEAPON_STATE.onTheGround && distance <= WEAPON.minDistance && !this.player.getWeapon()) {
                weapon.setStatus(WEAPON_STATE.inTheHand);
                this.player.setWeapon(weapon);
            }
        });
    }

    update() {
        this.field.update();
        this.tracing.updateViewRange();
        Object.values(this.enemies).forEach(enemy => {
            enemy.checkActive(this.field);
            enemy.getBullets().forEach(bullet => {
                bullet.updatePosition();
            });
            if (enemy.getMeleeStrike()) {
                this.updateEnemyMeleeStrike(enemy);
            }
            enemy.update();
        })
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
        enemy.getMeleeStrike().x = enemy.model.x;
        enemy.getMeleeStrike().y = enemy.model.y;
        enemy.getMeleeStrike().angle = enemy.getAngle();

    }

    takeAmmunition() {
        const weapon = this.player.getWeapon();
        this.field.ammunition.forEach(ammunition => {
            if (ammunition.active && weapon && weapon.isDistant()) {
                const pickedUp = weapon.pickupAmmunition(ammunition, this.player);
                if (!pickedUp) {
                    ammunition.active = false;
                    ammunition.respawn();
                }
            }
        });
    }

    takeAidKit() {
        this.field.aidKits.forEach(aidKit => {
            if (aidKit.active && !this.player.pickupAidKit(aidKit)) {
                aidKit.active = false;
                aidKit.respawn();
            }
        });
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
    }

    bulletsIntersectionEnemy() {
        this.player.setBullets(this.player.getBullets().filter(
            bullet => {
                let hit = false;
                Object.entries(this.enemies).forEach(([id, enemy]) => {
                    if (enemy.isAlive() && bullet.isIntersectEnemy(enemy.model)) {
                        hit = true;
                        this.player.addDamage(id, 1)
                    }
                });
                return !hit;
            }
        ));
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
                    this.player.addDamage(id, 3);
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
    }

    /**
     * 
     * @param {Object} event 
     */
    keyDown(event) {
        if (event.code === KEYBOARD_E && this.player.isAlive() && !this.player.getWeapon()) {
            this.addWeapon();
        } else if (event.code === KEYBOARD_E) {
            this.player.setStacked(false);
            this.player.dropWeapon();
            if (this.player.getMeleeStrike()) {
                this.player.setAnimating(false);
                this.player.removeMeleeStrike();
            }
        }
        if (event.code === KEYBOARD_F) {
            this.model.leaderBoard = true;
        }
    }

    /**
     * 
     * @param {Object} event 
     */
    keyUp(event) {
        if (event.code === KEYBOARD_F) {
            this.model.leaderBoard = false;
        }
    }

    nextFrame() {
        this.update();
        this.view.update(this.field, this.player, this.enemies, this.player.leaderBoard, this.model.leaderBoard, this.model.isShaking());
    }
}

export { EngineController };
