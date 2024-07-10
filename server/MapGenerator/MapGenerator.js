import { wallList, weaponSet, groundList, bonusSet, ammunitionSet } from "../data.js";

class MapGenerator {
    constructor() {

    }

    create() {
        return {
            "player": {
                x: 2000,
                y: 900,
                skinId: 5,
                spawnPoints: [
                    {
                        x: 420,
                        y: 582,
                    },

                    {
                        x: 1400,
                        y: 350,
                    },

                    {
                        x: 1000,
                        y: 670,
                    },

                    {
                        x: 2000,
                        y: 900,
                    },
                ]
            },
            "obj": {
                cells: groundList,
                walls: wallList,
                weapons: weaponSet,
                bonuses: bonusSet,
                ammunitions: ammunitionSet,
            },
        }
    }
}

export {MapGenerator}