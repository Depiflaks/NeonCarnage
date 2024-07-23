import { WEAPON_MODELS } from "../../CONST/GAME/WEAPON/WEAPON_MODELS.js";
function convertFields(cellsList) {
    const result = [];
    for (let i = 0; i < cellsList.length; i++) {
        for (let j = 0; j < cellsList[i].length; j++) {
            if (cellsList[i][j] === '1') {
                result.push([i, j]);
            }
        }
    }
    return result;
}

const spawnPoints = [
    {
        x: 75,
        y: 75
    },
    // {
    //     x: 2325,
    //     y: 75
    // },
    // {
    //     x: 2325,
    //     y: 1725
    // },
    // {
    //     x: 75,
    //     y: 1725
    // }
]

const cellsList = [
    '111111111111', 
    '111111111111',  
    '111111111111', 
    '111111111111', 
    '111111111111', 
    '111111111111',  
    '111111111111', 
    '111111111111', 
    '111111111111', 
    '111111111111',  
    '111111111111', 
    '111111111111', 
    '111111111111', 
    '111111111111',  
    '111111111111', 
    '111111111111'
];

const wallList = [
    [0, 0, 16, 0],
    [0, 0, 0, 12],
    [16, 0, 16, 12],
    [0, 12, 16, 12],
    [0, 4, 1, 4],  
    [1, 7, 1, 8],
    [1, 2, 2, 2], 
    [1, 10, 2, 10], 
    [2, 1, 2, 2], 
    [2, 10, 2, 11],  
    [2, 6, 3, 6], 
    [3, 4, 3, 6],
    [3, 9, 3, 10],
    [4, 1, 5, 1], 
    [4, 11, 4, 12], 
    [5, 4, 5, 5], 
    [5, 7, 5, 9],
    [5, 4, 6, 4],
    [5, 9, 7, 9],
    [6, 2, 7, 2],
    [6, 7, 7, 7],
    [7, 7, 7, 8],
    [7, 5, 8, 5],
    [7, 11, 9, 11],
    [8, 5, 8, 6],
    [8, 10, 8, 11],
    [8, 4, 9, 4],
    [8, 9, 9, 9],
    [9, 1, 9, 2],
    [9, 2, 10, 2],
    [10, 6, 10, 7],
    [10, 6, 11, 6],
    [11, 4, 12, 4],
    [11, 9, 12, 9],
    [11, 11, 12, 11],
    [12, 0, 12, 1],
    [12, 4, 12, 6],
    [12, 8, 12, 9],
    [13, 6, 13, 7],
    [13, 6, 14, 6],
    [14, 1, 14, 2],
    [14, 10, 14, 11],
    [14, 2, 15, 2],
    [14, 10, 15, 10],
    [15, 4, 15, 5],
    [15, 8, 16, 8]
];

const weaponSet = [
    {
        id: 1,
        type: WEAPON_MODELS.glock, 
        x: 1,
        y: 1,
    },
    {
        id: 2,
        type: WEAPON_MODELS.pistol,
        x: 1,
        y: 10,
    },
    {
        id: 3,
        type: WEAPON_MODELS.pistol,
        x: 14,
        y: 1,
    },
    {
        id: 4,
        type: WEAPON_MODELS.glock,
        x: 14,
        y: 10,
    },
    {
        id: 5,
        type: WEAPON_MODELS.rifle, 
        x: 5,
        y: 4,
    },
    {
        id: 6,
        type: WEAPON_MODELS.machineGun, 
        x: 6, 
        y: 7, 
    },
    {
        id: 7,
        type: WEAPON_MODELS.rifle, 
        x: 11, 
        y: 8, 
    },
    {
        id: 8,
        type: WEAPON_MODELS.knife,
        x: 10, 
        y: 5, 
    },
];

const ammunitionSet = [
    {
        x: 0,
        y: 7,
    },
    {
        x: 11,
        y: 0,
    },
    {
        x: 10,
        y: 10,
    },
    {
        x: 15,
        y: 4,
    }
];

const aidKitSet = [
    {
        x: 2,
        y: 6,
    },
    {
        x: 7,
        y: 2,
    },
    {
        x: 6,
        y: 11,
    },
    {
        x: 14,
        y: 7,
    }
];

const groundList = convertFields(cellsList);

export const map1 = {wallList, weaponSet, groundList, aidKitSet, ammunitionSet, spawnPoints}