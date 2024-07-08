import {ConnectionController} from "../Connection/ConnectionController.js";
import { DURATION } from "../CONST.js";
import { EngineController } from "../Engine/Engine/EngineController.js";

class GameController {
    constructor(objects, document) {
        this.document = document;
        this.canvas = this.document.getElementById("canvas");
        this.canvas.style.cursor = 'none';
        this.connection = new ConnectionController();
        this.engine = new EngineController(objects, this.connection, this.canvas);

        this.connection.setObj(this.engine.player, this.engine.field, this.engine.enemies);

        this.lastTime = 0;
    }

    loop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        if (deltaTime >= DURATION) {
            this.engine.nextFrame();
            this.connection.sendPosition(); 
            this.lastTime = timestamp;
        }

        requestAnimationFrame((timestamp) => { this.loop(timestamp) });
    }

    
}

export { GameController };
