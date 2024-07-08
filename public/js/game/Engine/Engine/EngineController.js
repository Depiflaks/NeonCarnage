import { CAMERA, DURATION, KEYBOARD_E, WEAPON, WEAPON_STATE } from "../../CONST.js";
import { EngineModel } from "./EngineModel.js";
import { EngineView } from "./EngineView.js";
import { Tracing } from "../RayTracing/Tracing.js";

class EngineController {
    constructor(objects, player, canvas) {
        this.model = new EngineModel(objects, player);
        this.view = new EngineView(canvas);
        
        this.enemies = this.model.getEnemies();
        this.field = this.model.getField();
        this.player = this.model.getPlayer();
        this.tracing = new Tracing(this.player, this.field);

        this.lastTime = 0;

        this.initEventListeners(canvas);
    }

    moveFrame() {
        const { x, y } = this.player.getPosition();
        const [dx, dy] = [
            Math.round(CAMERA.center.x - x),
            Math.round(CAMERA.center.y - y)
        ];
        const period = CAMERA.period;
        this.field.move(dx / period, dy / period);
        this.player.move(dx / period, dy / period);
        Object.values(this.enemies).map(enemy => {
            enemy.move(dx / period, dy / period);
        });
    }

    addWeapon() {
        const { x, y } = this.player.getPosition();
        this.field.weapons.map(weapon => {
            const distance = Math.sqrt((weapon.model.x - x) ** 2 + (weapon.model.y - y) ** 2);
            if ((distance <= WEAPON.minDistance) && !this.player.getWeapon()) {
                weapon.model.status = WEAPON_STATE.inTheHand;
                this.player.setWeapon(weapon);
            }
        });
    }

    update() {
        this.field.update();
        this.checkIntersections([].concat(this.field.verticalWalls, this.field.horizontalWalls), this.enemies);
        this.takeAmmunition();
        this.takeBonus();
        this.player.update();
        Object.values(this.enemies).map(enemy => {
            //console.log(enemy)
            enemy.update();
        })
        this.moveFrame();
        this.tracing.updateViewRange();
    }

    takeAmmunition() {
        const playerPosition = this.player.getPosition();
        this.field.ammunition = this.field.ammunition.filter(ammunition => {
            const weapon = this.player.getWeapon();
            if (weapon && weapon.isDistant()) {
                return weapon.pickupAmmunition(ammunition, playerPosition);
            }
            return true;
        });
    }

    takeBonus() {
        this.field.bonuses = this.field.bonuses.filter(bonus => {
            return this.player.pickupBonus(bonus);
        });
    }

    bulletsIntersectionWall(barriers) {
        this.player.setBullets(this.player.getBullets().filter(
            bullet => {
                bullet.updatePosition();
                for (const barrier of barriers) {
                    if (bullet.isIntersectLines(barrier)) return false;
                }
                return true;
            }
        ));
    }

    bulletsIntersectionEnemy(enemies) {
        this.player.setBullets(this.player.getBullets().filter(
            bullet => {
                let hit = false;
<<<<<<< Updated upstream
                Object.values(enemies).forEach(enemy => {
=======
                Object.entries(this.enemies).forEach(([id, enemy]) => {
>>>>>>> Stashed changes
                    if (bullet.isIntersectEnemy(enemy.model)) {
                        hit = true;
                        if (this.player.model.damage[id] == undefined) {
                            this.player.model.damage[id] = {shotDown: 1};
                        }
                        else {
                            this.player.model.damage[id].shotDown += 1;
                        }
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
        for (const obj of drawableArray) {
            this.player.check(obj);
        }
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
        addEventListener("keydown", (event) => this.keyDown(event));
        canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault(); // Отключаем контекстное меню при правом клике
        });
    }

    keyDown(event) {
        if ((event.code === KEYBOARD_E) && (!this.player.getWeapon())) {
            this.addWeapon();
        } else if (event.code === KEYBOARD_E) {
            this.player.setStacked(false);
            this.player.dropWeapon();
            if (this.player.getTrajectory()) {
                this.player.setAnimating(false);
                this.player.removeTrajectory();
            }
        }
    }

    loop(timestamp) {
        const deltaTime = timestamp - this.lastTime;

        if (deltaTime >= DURATION) {
            this.update();
            this.view.updateFrame(this.field, this.player, this.enemies);
            const { x, y } = this.player.getPosition();
            this.connection.sendPosition({x: x - this.field.x, y: y - this.field.y, angle: this.player.getAngle()}); 
            this.lastTime = timestamp;
        }

        requestAnimationFrame((timestamp) => { this.loop(timestamp) });
    }
}

export { EngineController };
