import { CAMERA } from "../settings.js";
import { PlayerController } from '../Player/PlayerController.js';
import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";

//console.log(groundList);

class GameController {
    constructor(objects, player, canvas) {
        this.model = new GameModel(objects);
        this.view = new GameView(canvas);

        this.player = new PlayerController(this.view.context, player);
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