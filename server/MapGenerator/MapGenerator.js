import { wallList, weaponSet, groundList, bonusSet, ammunitionSet } from "../data.js";

class MapGenerator {
    constructor() {

    }

    create() {
        return {
            "player": {
                x: 1420,
                y: 682,
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