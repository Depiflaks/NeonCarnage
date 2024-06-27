import { BattleGround } from "../BattleGround/BattleGround.js";
import { PlayerModel } from "../Player/PlayerModel.js";


class GameModel {
    constructor({cellsList, wallsList, weaponList}) {
        this.playerModel = new PlayerModel(px, py);
        this.field = new BattleGround(cellsList, wallsList, weaponList);
    }
}

export { GameModel };