import { wallList, weaponSet, groundList, bonusSet, ammunitionSet } from "../data.js";

class MapGenerator {
    constructor() {

    }

    create() {
        return {
            "player": {
                skinId: 5,
                spawnPoints: [
                    {
                        x: 447,
                        y: 267,
                    },

                    {
                        x: 1366,
                        y: 291,
                    },
                    {
                        x: 2236,
                        y: 149,
                    },

                    {
                        x: 2849,
                        y: 588,
                    },

                    {
                        x: 3761,
                        y: 1196,
                    },

                    {
                        x: 3604,
                        y: 2544,
                    },

                    {
                        x: 2861,
                        y: 2242,
                    },

                    {
                        x: 1667,
                        y: 3149,
                    },

                    {
                        x: 608,
                        y: 3146,
                    },

                    {
                        x: 146,
                        y: 2110,
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