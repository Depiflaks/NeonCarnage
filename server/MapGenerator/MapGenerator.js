import { wallList, weaponSet, groundList, bonusSet, ammunitionSet } from "../data.js";

class MapGenerator {
    constructor() {

    }

    create() {
        return {
            "player": {
                x: 3525,
                y: 2475,
                skinId: 5,
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