import { CAMERA } from "../settings.js";
import { PlayerController } from '../Player/PlayerController.js';
import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";
import { state } from "../Weapon/Weapon.js"

class GameController {
    constructor(objects, player, canvas) {
        this.model = new GameModel(objects);
        this.view = new GameView(canvas);

        this.player = new PlayerController(this.view.context, player);
        addEventListener("keydown", (event) => this.keyDown(event));
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

    keyDown(event) {
        if ((event.code == 'KeyE') && (this.player.model.weapon === undefined)) {
            this.distanceCheck();
        } else if (event.code == 'KeyE') {
            this.dropWeapon();
        }
    }

    distanceCheck(){
        const { x, y } = this.player.model.getPosition();
        this.model.field.weapons.map(
            weap => {
                const distance = ((weap.x - x)**2 + (weap.y - y)**2)**0.5;
                if (distance <= 40){
                    weap.status = state.inTheHand;
                    this.player.model.setWeapon(weap);
                }
            }
        )
    }
    
    dropWeapon() {
        this.player.model.weapon.unsetPlayer(this.player.model);
        this.player.model.weapon.status = state.onTheGround;
        this.player.model.weapon = undefined;
    }

    update() {
        this.moveFrame();
    }
    
    play() {
        this.update();
        this.view.updateFrame(this.model.field, this.player);
        // переписать обновление и прорисовку игрока по нормальному
        this.player.update();
        this.player.checkIntersections(this.model.field.walls);
        
        requestAnimationFrame(() => {this.play()});
    }
}

export { GameController };