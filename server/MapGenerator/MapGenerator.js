import { wallList, weaponSet, groundList, bonusSet, ammunitionSet } from "../data.js";

class MapGenerator {
    constructor() {

    }

    create() {
        return {
            cells: groundList,
            walls: wallList,
            weapons: weaponSet,
            bonuses: bonusSet,
            ammunitions: ammunitionSet,
        }
    }
}

export {MapGenerator}