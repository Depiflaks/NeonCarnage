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
            },
            "obj": {
                cells: groundList,
                walls: wallList,
                weapons: weaponSet,
                bonuses: bonusSet,
                ammunitions: ammunitionSet,
            },
            "spawnPoints": [
                {
                    x: 120,
                    y: 482,
                },

                {
                    x: 1600,
                    y: 250,
                },

                {
                    x: 1000,
                    y: 670,
                },

                {
                    x: 1800,
                    y: 900,
                },
            ]
        }
    }
}

export {MapGenerator}