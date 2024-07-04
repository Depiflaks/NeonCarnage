import { groundList, wallList, weaponSet } from "../data.js";

class MapGenerator {
    constructor() {

    }

    create() {
        return {
            cells: groundList,
            walls: wallList,
            weapons: weaponSet,
        }
    }
}

export {MapGenerator}