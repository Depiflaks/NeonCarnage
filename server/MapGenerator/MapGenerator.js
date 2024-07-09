import { wallList, weaponSet, groundList, bonusSet, ammunitionSet } from "../data.js";

class MapGenerator {
    constructor() {

    }

    create() {
        return {
            "player": {
                x: 1420,
                y: 682,
                skinId: 5,
                nickName: "noname",
            },
            "obj": {
                cells: groundList,
                walls: wallList,
                weapons: weaponSet,
                bonuses: bonusSet,
                ammunitions: ammunitionSet,
            }
        }
    }
}

export {MapGenerator}