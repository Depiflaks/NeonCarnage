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
    {
        x: 2325,
        y: 75
    },
    {
        x: 2325,
        y: 1675
    },
    {
        x: 75,
        y: 1675
    }
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
    [0, 8, 1, 8],  
    [1, 1, 1, 2],
    [1, 1, 2, 1], 
    [1, 10, 1, 11],
    [1, 11, 2, 11],
    [2, 5, 3, 5], 
    [2, 7, 3, 7],
    [3, 7, 3, 8],
    [3, 3, 3, 5],
    [3, 9, 3, 10],
    [4, 8, 5, 8],
    [5, 1, 6, 1],
    [5, 3, 5, 4],
    [5, 6, 5, 9],
    [5, 3, 6, 3],
    [5, 6, 6, 6],
    [6, 1, 6, 2],
    [6, 11, 6, 12],
    [6, 2, 7, 2],
    [7, 5, 7, 6],
    [7, 8, 7, 9],
    [7, 8, 8, 8],
    [8, 4, 9, 4],
    [8, 11, 9, 11],
    [9, 3, 9, 4],
    [9, 6, 9, 7],
    [9, 10, 9, 11],
    [9, 10, 10, 10],
    [10, 0, 10, 1],
    [10, 6, 11, 6],
    [10, 9, 11, 9],
    [11, 3, 11, 6],
    [11, 8, 11, 9],
    [11, 4, 12, 4],
    [12, 10, 12, 11],
    [13, 2, 13, 3],
    [13, 4, 13, 5],
    [13, 7, 13, 9],
    [13, 7, 14, 7],
    [13, 5, 14, 5],
    [14, 1, 15, 1],
    [14, 11, 15, 11],
    [15, 1, 15, 2],
    [15, 4, 16, 4],
    [15, 8, 16, 8],
    [15, 10, 15, 11],
];

const weaponSet = [
    {
        id: 1,
        type: WEAPON_MODELS.glock, 
        x: 0,
        y: 10,
    },
    {
        id: 2,
        type: WEAPON_MODELS.uzi,
        x: 0,
        y: 1,
    },
    {
        id: 3,
        type: WEAPON_MODELS.glock,
        x: 15,
        y: 1,
    },
    {
        id: 4,
        type: WEAPON_MODELS.uzi,
        x: 15,
        y: 10,
    },
    {
        id: 5,
        type: WEAPON_MODELS.rifle, 
        x: 6,
        y: 4,
    },
    {
        id: 6,
        type: WEAPON_MODELS.shotGun, 
        x: 9, 
        y: 4, 
    },
    {
        id: 7,
        type: WEAPON_MODELS.rifle, 
        x: 9, 
        y: 7, 
    },
    {
        id: 8,
        type: WEAPON_MODELS.knife,
        x: 6, 
        y: 7, 
    },
];

const ammunitionSet = [
    {
        x: 1,
        y: 8,
    },
    {
        x: 10,
        y: 11,
    },
    {
        x: 5,
        y: 0,
    },
    {
        x: 13,
        y: 3,
    },
    {
        x: 3,
        y: 5,
    },
    {
        x: 7,
        y: 9,
    },
    {
        x: 8,
        y: 2,
    },
    {
        x: 11,
        y: 6,
    },
];

const aidKitSet = [
    {
        x: 2,
        y: 4,
    },
    {
        x: 5,
        y: 3,
    },
    {
        x: 5,
        y: 11,
    },
    {
        x: 8,
        y: 6,
    },
    {
        x: 9,
        y: 0,
    },
    {
        x: 11,
        y: 3,
    },
    {
        x: 13,
        y: 7,
    }
];

const groundList = convertFields(cellsList);
const map6 = { wallList, weaponSet, groundList, aidKitSet, ammunitionSet, spawnPoints};

export {map6}