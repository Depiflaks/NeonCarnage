
import { WeaponModel } from "./WeaponModel.js";
import { WeaponView } from "./WeaponView.js";

class WeaponController {
    constructor (player) {
        this.model = new WeaponModel(player);
        this.view = new WeaponView();
    }

    /**
     * 
     * @param {object} player модель данных игрока 
     */
    unsetPlayer(player) {
        this.model.x = player.x;
        this.model.y = player.y;
    }
}

export { WeaponController };