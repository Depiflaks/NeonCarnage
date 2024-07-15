import { CAMERA, KEYBOARD_E, KEYBOARD_TAB, WEAPON, WEAPON_STATE } from "../../CONST.js";
import { EngineModel } from "./EngineModel.js";
import { EngineView } from "./EngineView.js";
import { Tracing } from "../RayTracing/Tracing.js";

class EngineController {
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
        this.field.weapons.forEach(weapon => {
            const distance = Math.sqrt((weapon.model.x - x) ** 2 + (weapon.model.y - y) ** 2);
            if (weapon.getStatus() === WEAPON_STATE.onTheGround && distance <= WEAPON.minDistance && !this.player.getWeapon()) {
                weapon.model.status = WEAPON_STATE.inTheHand;
                this.player.setWeapon(weapon);
            }
        });
    }

    update() {
        this.field.update();
        this.tracing.updateViewRange();
        Object.values(this.enemies).map(enemy => {
            enemy.checkActive(this.field);
            enemy.getBullets().map(bullet => {
                bullet.updatePosition();
            });
            enemy.update();
        })
        this.checkIntersections([...this.field.verticalWalls, ...this.field.horizontalWalls]);
        this.takeAmmunition();
        this.takeBonus();
        this.player.update();
        
        this.move();
        this.model.updateShake();
    }

    takeAmmunition() {
        const playerPosition = this.player.getPosition();
        this.field.ammunition.forEach(ammunition => {
            const weapon = this.player.getWeapon();
            if (ammunition.active && weapon && weapon.isDistant()) {
                const pickedUp = weapon.pickupAmmunition(ammunition, playerPosition);
                if (!pickedUp) {
                    ammunition.active = false;
                    ammunition.respawn();
                }
            }
        });
    }

    takeBonus() {
        this.field.bonuses.forEach(bonus => {
            if (bonus.active) {
                const pickedUp = this.player.pickupBonus(bonus);
                if (!pickedUp) {
                    bonus.active = false;
                    bonus.respawn();
                }
            }
        });
    }

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

    checkIntersections(drawableArray, moveableArray) {
        this.bulletsIntersectionWall(drawableArray);
        this.bulletsIntersectionEnemy(moveableArray);
        this.intersectTrajectory(drawableArray);
        drawableArray.forEach(obj => {
            this.player.check(obj);
        });
    }

    intersectTrajectory(walls) {
        if (!this.player.getTrajectory()) return;
        for (const wall of walls) {
            if (this.player.getTrajectory().isIntersect(wall)) {
                if (!this.player.getIsStriking()) {
                    this.player.removeTrajectory();
                } else {
                    this.player.setStacked(true);
                }
                break;
            }
        }
    }

    initEventListeners(canvas) {
        addEventListener("keydown", event => this.keyDown(event));
        addEventListener("keyup", event => this.keyUp(event));
        canvas.addEventListener('contextmenu', event => {
            event.preventDefault(); // Отключаем контекстное меню при правом клике
        });
    }

    keyDown(event) {
        if (event.code === KEYBOARD_E && this.player.isAlive() && !this.player.getWeapon()) {
            this.addWeapon();
        } else if (event.code === KEYBOARD_E) {
            this.player.setStacked(false);
            this.player.dropWeapon();
            if (this.player.getTrajectory()) {
                this.player.setAnimating(false);
                this.player.removeTrajectory();
            }
        }
        if (event.code === KEYBOARD_TAB) {
            this.model.leaderBoard = true;
        }
    }

    keyUp(event) {
        if (event.code === KEYBOARD_TAB) {
            this.model.leaderBoard = false;
        }
    }

    nextFrame() {
        this.update();
        //console.log(this.player.leaderBoard);
        this.view.update(this.field, this.player, this.enemies, this.player.leaderBoard, this.model.leaderBoard, this.model.isShaking());
    }
}

export { EngineController };
