import { BOT_SKINS } from "../../../CONST.js";

class BotSkin {
    constructor({ skinId }) {
        this.alive = new Image();
        this.legs = new Image();
        this.died = new Image();
        this.alive.src = BOT_SKINS[skinId].alive;
        this.legs.src = BOT_SKINS[skinId].legs;
        this.died.src = BOT_SKINS[skinId].died;
    }
}

export {BotSkin}