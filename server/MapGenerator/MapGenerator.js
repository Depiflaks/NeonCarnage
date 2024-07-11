import { wallList, weaponSet, groundList, bonusSet, ammunitionSet } from "../data.js";

class MapGenerator {
    constructor() {

    }

    create() {
        return {
            "player": {
                x: 0,
                y: 0,
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
                        y: 1770,
                    },

                    {
                        x: 2100,
                        y: 700,
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