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
        field.drawWeapons(player.model, this.context);
        player.view.draw(
            player.model.getPosition(), 
            player.model.getAngle()
        );
        player.view.drawBullets(player.model.getBullets());
        field.drawWalls(this.context);
        player.view.drawBulletAmount(player.model);
    }

    updateFrame(field, player) {
        field.clearFrame(this.context);
        this.drawFrame(field, player);
    }
}


export { GameView };