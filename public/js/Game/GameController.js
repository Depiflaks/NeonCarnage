import { CAMERA, KEYBOARD_E, MIN_DISTANCE, WEAPON_STATE } from "../settings.js";
import { PlayerController } from '../Player/PlayerController.js';
import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";

class GameController {
    constructor(objects, player, canvas) {
        this.model = new GameModel(objects, player);
        this.view = new GameView(canvas);

        this.player = new PlayerController(this.model.playerModel, this.view.playerView);
        addEventListener("keydown", (event) => this.keyDown(event));
    }
    
    moveFrame() {
        const [dx, dy] = [
            CAMERA.center.x - this.model.playerModel.getPosition().x, 
            CAMERA.center.y - this.model.playerModel.getPosition().y
        ];
        const period = (Math.abs(dx) + Math.abs(dy) < 0.5) ? 1 : CAMERA.period;
        this.model.field.move(dx / period, dy / period);
        this.model.playerModel.move(dx / period, dy / period);
    }

    keyDown(event) {
        if ((event.code == KEYBOARD_E) && (this.player.model.weapon === null)) {
            this.distanceCheck();
        } else if (event.code == KEYBOARD_E) {
            this.dropWeapon();
        }
    }

    distanceCheck(){
        const { x, y } = this.model.playerModel.getPosition();
        this.model.field.weapons.map(
            weapon => {
                const distance = ((weapon.x - x)**2 + (weapon.y - y)**2)**0.5;
                if ((distance <= MIN_DISTANCE) && (this.player.model.weapon === null)) {
                    weapon.status = WEAPON_STATE.inTheHand;
                    this.player.model.setWeapon(weapon);
                }
            }
        )
    }
    
    dropWeapon() {
        this.player.model.weapon.unsetPlayer(this.player.model);
        this.player.model.weapon.status = WEAPON_STATE.onTheGround;
        this.player.model.weapon = null;
    }

    update() {
        this.moveFrame();
    }
    
    play() {
        this.update();
        this.view.updateFrame(this.model.field, this.model.playerModel);
        // переписать обновление и прорисовку игрока по нормальному
        this.player.update();   
        this.player.checkIntersections(this.model.field.walls);
        this.view.updateFrame(this.model.field, this.player);
        requestAnimationFrame(() => {this.play()});
    }   
}

export { GameController };