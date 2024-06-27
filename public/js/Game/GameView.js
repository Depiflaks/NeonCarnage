import { PlayerView } from "../Player/PlayerView.js";
import { WINDOW } from "../settings.js";


class GameView {
    constructor(canvas) {
        this.canvas = canvas
        canvas.width = WINDOW.w;
        canvas.height = WINDOW.h;
        this.context = canvas.getContext("2d");
    }

    /**
     * 
     * @param {object} field все данные на экране; комнаты, стены, оружия
     * @param {object} player вся модель mvc игрока
     */
    drawFrame(field, player) {
        field.drawGround(this.context);
        field.drawWeapons(player.model, this.context);
        player.view.draw(
            player.model.getPosition(), 
            player.model.getAngle()
        );
        field.drawWalls(this.context);
    }

    /**
     * 
     * @param {object} field все данные на экране; комнаты, стены, оружия
     * @param {object} player вся модель mvc игрока 
     */
    updateFrame(field, player) {
        field.clearFrame(this.context);
        this.drawFrame(field, player);
    }
}


export { GameView };