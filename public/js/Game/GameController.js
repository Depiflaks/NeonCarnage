import { CAMERA, KEYBOARD_E, MIN_DISTANCE, WEAPON_STATE } from "../settings.js";
import { PlayerController } from '../Player/PlayerController.js';
import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";
import { ConnectionController} from "../Connection/ConnectionController";


class GameController {
    constructor(objects, player, canvas) {
        this.model = new GameModel(objects);
        this.view = new GameView(canvas);
        this.connection = new ConnectionController();

        this.player = new PlayerController(this.view.context, player);
        addEventListener("keydown", (event) => this.keyDown(event));
        canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault(); // Отключаем контекстное меню при правом клике
        });
    }
    
    moveFrame() {
        const [dx, dy] = [
            CAMERA.center.x - this.player.model.getPosition().x, 
            CAMERA.center.y - this.player.model.getPosition().y
        ];
        const period = (Math.abs(dx) + Math.abs(dy) < 0.5) ? 1 : CAMERA.period;
        this.model.field.move(dx / period, dy / period);
        this.player.model.move(dx / period, dy / period);
        
        
    }

    updateBullets(player, barriers) {
        player.bullets = player.bullets.filter(
            bullet => {
                bullet.updatePosition();
                for (const barrier of barriers) {
                    if (bullet.isIntersect(barrier)) {
                        return false;
                    }
                }
                return true;
            }
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
        console.log(this.player.model.weapon);
        this.player.model.weapon = null;
    }

    update() {
        this.moveFrame();
        this.updateBullets(this.player.model, this.model.field.walls);
        const { x, y } = this.player.model.getPosition();
        this.connection.sendPosition(x, y);  // Отправка данных на сервер
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
        this.checkIntersections(this.player, this.model.field.walls);
        this.player.updatePosition();
        
        requestAnimationFrame(() => {this.play()});
    }   
}

export { GameController };