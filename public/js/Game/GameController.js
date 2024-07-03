import { CAMERA, KEYBOARD_E, MIN_DISTANCE, WEAPON_STATE } from "../settings.js";
import { PlayerController } from '../Player/PlayerController.js';
import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";
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
    }
    
    moveFrame() {
        const [dx, dy] = [
            Math.round(CAMERA.center.x - this.player.model.getPosition().x), 
            Math.round(CAMERA.center.y - this.player.model.getPosition().y)
        ];
        const period = (Math.abs(dx) + Math.abs(dy) < 5) ? 1 : CAMERA.period;
        this.model.field.move(dx / period, dy / period);
        this.player.model.move(dx / period, dy / period);
        
        
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
        this.field.update();
        this.checkIntersections([].concat(this.field.verticalWalls, this.field.horisontalWalls));
        this.player.update();
        this.moveFrame();
        //this.tracing.updateViewRange();
        const { x, y } = this.player.getPosition();
        this.sendPosition(x - this.field.x, y - this.field.y);  // Отправка данных на сервер
    }

    sendPosition(x, y) {
        if (this.socket.readyState === WebSocket.OPEN) {
            const data = JSON.stringify({ x, y });
            this.socket.send(data);
        }
    }

    bulletsIntersection(barriers) {
        this.player.setBullets(this.player.getBullets().filter(
            bullet => {
                bullet.updatePosition();
                for (const barrier of barriers) {
                    if (bullet.isIntersect(barrier)) {
                        return false;
                    }
                }
                return true;
            })
        );
    }

    keyDown(event) {
        if ((event.code == KEYBOARD_E) && (this.player.model.weapon === null)) {
            this.distanceCheck();
        } else if (event.code == KEYBOARD_E) {
            this.dropWeapon();
        }
    }

    distanceCheck() {
        const { x, y } = this.player.model.getPosition();
        this.model.field.weapons.map(
            weapon => {
                const distance = Math.sqrt((weapon.model.x - x)**2 + (weapon.model.y - y)**2);
                if ((distance <= MIN_DISTANCE) && (this.player.model.weapon === null)) {
                    weapon.model.status = WEAPON_STATE.inTheHand;
                    this.player.model.setWeapon(weapon);
                }
            }
        )
    }
    
    dropWeapon() {
        this.player.model.weapon.unsetPlayer(this.player.model);
        this.player.model.weapon.model.status = WEAPON_STATE.onTheGround;
        //console.log(this.player.model.weapon);
        this.player.model.weapon = null;
    }

    update() {
        this.moveFrame();
        this.updateBullets(this.player.model, [].concat(this.model.field.verticalWalls, this.model.field.horisontalWalls));
        const { x, y } = this.player.model.getPosition();
        this.connection.sendPosition(x, y);
    }

    checkIntersections(player, drawableArray) {
        for (const drawableObj of drawableArray) {

            player.model.updatePositionY();
            if(player.model.isIntersect(drawableObj)) {
                player.model.stepBackY();
                player.model.resetSpeedY();
            }
            else {
                player.model.stepBackY();
            }

            player.model.updatePositionX();
            if(player.model.isIntersect(drawableObj)) {
                player.model.stepBackX();
                player.model.resetSpeedX();
            }
            else {
                player.model.stepBackX();
            }
        }
        return false;
    }
    
    play() {
        this.update();
        this.view.updateFrame(this.model.field, this.player);
        this.checkIntersections(this.player, [].concat(this.model.field.verticalWalls, this.model.field.horisontalWalls));
        this.player.updatePosition();
        requestAnimationFrame(() => {this.play()});
    }
}

export { GameController };