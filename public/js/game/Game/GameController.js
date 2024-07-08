import {ConnectionController} from "../Connection/ConnectionController.js";
import { EngineController } from "../Engine/Engine/EngineController.js";

class GameController {
    constructor(objects, player, document) {
        this.document = document;
        this.canvas = this.document.getElementById("canvas");
        this.canvas.style.cursor = 'none';
        this.engine = new EngineController(objects, player, this.canvas);

        this.connection = new ConnectionController(
            this.engine.player, 
            this.engine.enemies, 
            this.engine.field
        );

        this.engine.connection = this.connection;
    }

    start() {
        this.engine.loop();
    }

    
}

export { GameController };
