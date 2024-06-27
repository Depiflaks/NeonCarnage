import { CAMERA } from "../settings.js";
import { PlayerController } from '../Player/PlayerController.js';
import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";
import { state } from "../Weapon/Weapon.js"

class GameController {
    constructor(objects, player, canvas) {
        this.model = new GameModel(objects, player);
        this.view = new GameView(canvas);

        this.playerController = new PlayerController(this.model.playerModel, this.view.playerView);
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
        if ((event.code == 'KeyE') && (this.model.playerModel.weapon === 0)) {
            this.distanceCheck();
        } else if (event.code == 'KeyE') {
            this.dropWeapon();
        }
    }

    distanceCheck(){
        const { x, y } = this.model.playerModel.getPosition();
        this.model.field.weapons.map(
            weap => {
                const distance = ((weap.x - x)**2 + (weap.y - y)**2)**0.5;
                if (distance <= 40){
                    weap.status = state.inTheHand;
                    this.model.playerModel.setWeapon(weap);
                    weap.setPlayer(this.model.playerModel);
                }
            }
        )
    }
    
    dropWeapon() {
        this.model.playerModel.weapon.unsetPlayer();
        this.model.playerModel.weapon.status = state.onTheGround;
        this.model.playerModel.weapon = 0;
    }

    update() {
        this.moveFrame();
    }
    
    play() {
        this.update();
        this.view.updateFrame(this.model.field, this.model.playerModel);
        // переписать обновление и прорисовку игрока по нормальному
        this.playerController.update();
        this.playerController.checkIntersections(this.model.field.walls);
        
        requestAnimationFrame(() => {this.play()});
    }
}

export { GameController };