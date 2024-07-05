import {AMMUNITION, BONUS, CAMERA, DURATION, KEYBOARD_E, SERVER, WEAPON, WEAPON_STATE} from "../CONST.js";
import { PlayerController } from '../Player/PlayerController.js';
import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";
import { Tracing } from "../RayTracing/Tracing.js";
import { Trajectory } from "../Weapon/Trajectory.js";
import {ConnectionController} from "../Connection/ConnectionController.js";

class GameController {
    constructor(objects, player, canvas) {
        this.model = new GameModel(objects);
        this.view = new GameView(canvas);
        this.players = [];
        this.field = this.model.getField();
        this.connection = new ConnectionController(this.players, this.field, this.view.context);
        this.player = new PlayerController(this.view.context, player);


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
    takeAmmunition() {
        const playerPosition = this.player.getPosition();
        this.field.ammunition = this.field.ammunition.filter(ammunition => {
            const weapon = this.player.getWeapon();
            if (weapon && weapon.isDistantWeapon()) {
                return weapon.pickupAmmunition(ammunition, playerPosition);
            }
            return true;
        });
    }

    takeBonus() {
        const playerPosition = this.player.getPosition();
        this.field.bonuses = this.field.bonuses.filter(bonus => {
            return this.player.pickupBonus(bonus, playerPosition);
        });
    }

    update() {
        this.field.update();
        this.takeAmmunition();
        this.takeBonus();
        this.checkIntersections([].concat(this.field.verticalWalls, this.field.horisontalWalls));
        this.player.update();
        this.moveFrame();
        this.tracing.updateViewRange();
        const { x, y } = this.player.getPosition();
        this.connection.sendPosition(x - this.field.x, y - this.field.y);
    }

    bulletsIntersection(barriers) {
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

    checkIntersections(drawableArray) {
        this.bulletsIntersection(drawableArray);
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
                this.player.model.removeTrajectory();
            }
        }
    }

    loop(timestamp) {
        const deltaTime = timestamp - this.lastTime;

        if (deltaTime >= DURATION) {
            this.update();
            this.view.updateFrame(this.field, this.player, this.players);

            this.lastTime = timestamp;
        }

        requestAnimationFrame((timestamp) => { this.loop(timestamp) });
    }
}

export { GameController };
