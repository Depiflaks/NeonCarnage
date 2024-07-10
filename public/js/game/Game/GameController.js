import {ConnectionController} from "../Connection/ConnectionController.js";
import { FRAME_DURATION, REQUEST_DURATION } from "../CONST.js";
import { EngineController } from "../Engine/Engine/EngineController.js";

class GameController {
    constructor(objects, document) {
        this.document = document;
        this.canvas = this.document.getElementById("canvas");
        this.canvas.style.cursor = 'none';
        this.connection = new ConnectionController();
        this.engine = new EngineController(objects, this.connection, this.canvas);

        this.connection.setObj(this.engine.player, this.engine.field, this.engine.enemies);
        this.lastFrame = 0;
        this.lastRequest = 0;

        window.addEventListener('wheel', function(event) {
            if (event.ctrlKey) {
                event.preventDefault();
            }
        }, { passive: false });
    }

    loop(timestamp) {
        if (timestamp - this.lastFrame >= FRAME_DURATION) {
            this.engine.nextFrame();
            this.lastFrame = timestamp;
        }

        if (timestamp - this.lastRequest >= REQUEST_DURATION) {
            this.connection.sendData(); 
            this.lastRequest = timestamp;
        }

        requestAnimationFrame((timestamp) => { this.loop(timestamp) });
    }

    
}

export { GameController };
