import { CAMERA, KEYBOARD_E, MIN_DISTANCE, WEAPON_STATE } from "../settings.js";
import { PlayerController } from '../Player/PlayerController.js';
import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";
import { Tracing } from "../RayTracing/Tracing.js";

class GameController {
    constructor(objects, player, canvas) {
        this.model = new GameModel(objects);
        this.view = new GameView(canvas);
        this.player = new PlayerController(this.view.context, player);
        this.field = this.model.getField();
        this.tracing = new Tracing(this.player, this.field);
        
        this.eventListeners(canvas);
    }
    
    moveFrame() {
        const {x, y} = this.player.getPosition()
        const [dx, dy] = [
            Math.round(CAMERA.center.x - x), 
            Math.round(CAMERA.center.y - y)
        ];
        const period = (Math.abs(dx) + Math.abs(dy) < 5) ? 1 : CAMERA.period;
        this.field.move(dx / period, dy / period);
        this.player.move(dx / period, dy / period);
    }

    addWeapon() {
        const { x, y } = this.player.getPosition();
        this.field.weapons.map(weapon => {
            const distance = Math.sqrt((weapon.model.x - x)**2 + (weapon.model.y - y)**2);
            if ((distance <= MIN_DISTANCE) && !this.player.getWeapon()) {
                weapon.model.status = WEAPON_STATE.inTheHand;
                this.player.setWeapon(weapon);
            }
        });
    }

    update() {
        this.moveFrame();
        this.field.update();
        this.checkIntersections([].concat(this.field.verticalWalls, this.field.horisontalWalls));
        this.player.update();
        //this.tracing.updateViewRange();
    }

    bulletsIntersection(barriers) {
        this.player.setBullets(this.player.getBullets().filter(
            bullet => {
                bullet.updatePosition();
                for (const barrier of barriers) {
                    if (bullet.isIntersect(barrier)) return false;
                }
                return true;
            }
        ));
    }

    checkIntersections(drawableArray) {
        this.bulletsIntersection(drawableArray)
        for (const obj of drawableArray) {
            this.player.check(obj);
        }
    }

    eventListeners(canvas) {
        addEventListener("keydown", (event) => this.keyDown(event));
        canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault(); // Отключаем контекстное меню при правом клике
        });
    }

    keyDown(event) {
        if ((event.code == KEYBOARD_E) && (!this.player.getWeapon())) {
            this.addWeapon();
        } else if (event.code == KEYBOARD_E) {
            this.player.dropWeapon();
        }
    }

    play() {
        this.update();
        this.view.updateFrame(this.field, this.player);
        requestAnimationFrame(() => {this.play()});
    }
}

export { GameController };