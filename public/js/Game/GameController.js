import { CAMERA } from "../settings.js";
import { PlayerController } from '../Player/PlayerController.js';
import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";

//console.log(groundList);

class GameController {
    constructor(objects, player, canvas) {
        this.model = new GameModel(objects, player);
        this.view = new GameView(canvas);

        this.playerController = new PlayerController(this.model.playerModel, this.view.playerView);
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