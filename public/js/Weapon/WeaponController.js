
import { WeaponModel } from "./WeaponModel.js";
import { WeaponView } from "./WeaponView.js";

class WeaponController {
    constructor (player) {
        this.model = new WeaponModel(player);
        this.view = new WeaponView();
    }

    unsetPlayer(player) {
        this.model.x = player.x;
        this.model.y = player.y;
    }
}

export { WeaponController };