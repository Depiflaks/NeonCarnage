import { CAMERA, DURATION, KEYBOARD_E, SERVER, WEAPON, WEAPON_STATE } from "../CONST.js";
import { PlayerController } from '../Player/PlayerController.js';
import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";
import { Tracing } from "../RayTracing/Tracing.js";
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
        const {x, y} = this.player.getPosition()
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
            const distance = Math.sqrt((weapon.model.x - x)**2 + (weapon.model.y - y)**2);
            if ((distance <= WEAPON.minDistance) && !this.player.getWeapon()) {
                weapon.model.status = WEAPON_STATE.inTheHand;
                this.player.setWeapon(weapon);
            }
        });
    }

    update() {
        this.field.update();
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

    keyDown(event) {
        if ((event.code == KEYBOARD_E) && (!this.player.getWeapon())) {
            this.addWeapon();
        } else if (event.code == KEYBOARD_E) {
            this.player.dropWeapon();
        }
    }

    initEventListeners(canvas) {
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

    loop(timestamp) {
        const deltaTime = timestamp - this.lastTime;

        if (deltaTime >= DURATION) {
            //console.log(timestamp)
            this.update();
            this.view.updateFrame(this.field, this.player, this.players);

            this.lastTime = timestamp
        }
        
        requestAnimationFrame((timestamp) => {this.loop(timestamp)});
    }
}

export { GameController };