import { BOT_SKINS } from "../../../CONST.js";

class BotSkin {
    constructor({ skinId }) {
        this.alive = new Image();
        this.legs = new Image();
        console.log(skinId)
        this.alive.src = BOT_SKINS[skinId].alive;
        this.legs.src = BOT_SKINS[skinId].legs;
    }
}

export {BotSkin}