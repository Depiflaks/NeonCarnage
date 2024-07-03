import { CAMERA, DURATION, KEYBOARD_E, WEAPON, WEAPON_STATE } from "../CONST.js";
import { PlayerController } from '../Player/PlayerController.js';
import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";
import { Tracing } from "../RayTracing/Tracing.js";
import {ConnectionController} from "../Connection/ConnectionController.js";

class GameController {
    constructor(objects, player, canvas) {
        this.model = new GameModel(objects);
        this.view = new GameView(canvas);
        this.connection = new ConnectionController();
        this.player = new PlayerController(this.view.context, player);
        
        addEventListener("keydown", (event) => this.keyDown(event));
        canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        this.field = this.model.getField();
        this.tracing = new Tracing(this.player, this.field);
        
        this.lastTime = 0;

        this.eventListeners(canvas);

        const socket = new WebSocket('ws://10.250.104.176:8000/');
    
        this.socket = socket;
    
        socket.addEventListener('open', ({ data }) => {
            console.log('Соединение установлено');
        });
    
        socket.addEventListener('message', ({ data }) => {
            const change = JSON.parse(data);
            const {x, y} = this.player.getPosition();
            this.player.model.x = change.x + this.field.x;
            this.player.model.y = change.y + this.field.y;
        });
    
        socket.addEventListener('close', ({ data }) => {
            console.log('Соединение закрыто');
        });
    
        socket.addEventListener('error', (error) => {
            console.error('Ошибка WebSocket: ', error);
        });
        this.eventListeners(canvas);
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

sendPosition(x, y) {
    if (this.socket.readyState === WebSocket.OPEN) {
        const data = JSON.stringify({ x, y });
        this.socket.send(data);
    }
}

    update() {
        this.field.update();
        this.checkIntersections([].concat(this.field.verticalWalls, this.field.horisontalWalls));
        this.player.update();
        this.moveFrame();
        this.tracing.updateViewRange();
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

    loop(timestamp) {
        const deltaTime = timestamp - this.lastTime;

        if (deltaTime >= DURATION) {
            //console.log(timestamp)
            this.update();
            this.view.updateFrame(this.field, this.player);

            this.lastTime = timestamp
        }
        
        requestAnimationFrame((timestamp) => {this.loop(timestamp)});
    }
}

export { GameController };