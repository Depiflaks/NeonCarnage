import {ConnectionController} from "../Connection/ConnectionController.js";
import { DURATION } from "../CONST.js";
import { EngineController } from "../Engine/Engine/EngineController.js";

class GameController {
    constructor(objects, player, document) {
        this.document = document;
        this.canvas = this.document.getElementById("canvas");

        this.engine = new EngineController(objects, player, this.canvas);

        this.connection = new ConnectionController(
            this.engine.player, 
            this.engine.enemies, 
            this.engine.field
        );

        this.engine.connection = this.connection;

        this.lastTime = 0;
    }

    loop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        if (deltaTime >= DURATION) {
            this.engine.nextFrame();
            // const { x, y } = this.player.getPosition();
            // this.connection.sendPosition({x: x - this.field.x, y: y - this.field.y, angle: this.player.getAngle()}); 
            this.lastTime = timestamp;
        }

        requestAnimationFrame((timestamp) => { this.loop(timestamp) });
    }

    
}

export { GameController };
