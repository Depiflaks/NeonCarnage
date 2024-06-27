import { PlayerView } from "../Player/PlayerView.js";
import { WINDOW } from "../settings.js";


class GameView {
    constructor(canvas) {
        this.canvas = canvas
        canvas.width = WINDOW.w;
        canvas.height = WINDOW.h;
        this.context = canvas.getContext("2d");
    }

    drawFrame(field, player) {
        field.drawGround(this.context);
        field.drawWeapons(player, this.context);
        player.view.draw(
            player.model.getPosition(), 
            player.model.getAngle()
        );
        field.drawWalls(this.context);
    }

    updateFrame(field, player) {
        field.clearFrame(this.context);
        this.drawFrame(field, player);
    }
}


export { GameView };