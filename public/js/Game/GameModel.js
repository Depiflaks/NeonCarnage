import { BattleGround } from "../BattleGround/BattleGround.js";
import { PlayerModel } from "../Player/PlayerModel.js";
import {ammunitionSet, bonusSet} from "../data.js";


class GameModel {
    constructor({cellsList, wallsList, weaponList}) {
        this.field = new BattleGround(cellsList, wallsList, weaponList, ammunitionSet, bonusSet);
    }

    getField() {
        return this.field;
    }
}

export { GameModel };