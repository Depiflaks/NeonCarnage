import { groundList, wallList, weaponSet } from "../data.js";

class MapGenerator {
    constructor() {

    }

    getMap() {
        return {
            cells: groundList,
            walls: wallList,
            weapons: weaponSet,
        }
    }
}

export {MapGenerator}