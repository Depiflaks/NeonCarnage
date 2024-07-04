import { groundList, wallList, weaponSet, playerSet } from "../data.js";

class MapGenerator {
    constructor() {

    }

    create() {
        return {
            cells: groundList,
            walls: wallList,
            weapons: weaponSet,
            player: playerSet
        }
    }
}

export {MapGenerator}