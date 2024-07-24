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
    [0, 10, 1, 10],  
    [1, 3, 1, 4],
    [1, 3, 2, 3], 
    [2, 0, 2, 1], 
    [2, 8, 2, 9], 
    [2, 6, 3, 6], 
    [4, 2, 5, 2], 
    [4, 4, 4, 5],
    [4, 7, 4, 8],
    [4, 4, 7, 4],
    [4, 8, 7, 8],
    [4, 11, 5, 11],
    [5, 5, 6, 5],
    [5, 10, 5, 11],
    [6, 6, 6, 7],
    [6, 7, 7, 7],
    [7, 2, 8, 2],
    [7, 10, 8, 10],
    [7, 10, 7, 11],
    [8, 1, 8, 3],
    [8, 9, 8, 10],
    [9, 4, 12, 4],
    [9, 5, 10, 5],
    [9, 8, 12, 8],
    [10, 1, 10, 2],
    [10, 2, 11, 2],
    [10, 7, 11, 7],
    [10, 10, 11, 10],
    [12, 4, 12, 5],
    [12, 7, 12, 8],
    [13, 6, 14, 6],
    [14, 3, 14, 4],
    [14, 11, 14, 12],
    [14, 8, 15, 8],
    [15, 7, 15, 8],
    [15, 2, 16, 2]
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
        x: 1,
        y: 0,
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
        x: 14,
        y: 11,
    },
    {
        id: 5,
        type: WEAPON_MODELS.rifle, 
        x: 8,
        y: 4,
    },
    {
        id: 6,
        type: WEAPON_MODELS.shotGun, 
        x: 10, 
        y: 6, 
    },
    {
        id: 7,
        type: WEAPON_MODELS.rifle, 
        x: 7, 
        y: 7, 
    },
    {
        id: 8,
        type: WEAPON_MODELS.knife,
        x: 5, 
        y: 5, 
    },
];

const ammunitionSet = [
    {
        x: 1,
        y: 5,
    },
    {
        x: 6,
        y: 1,
    },
    {
        x: 9,
        y: 10,
    },
    {
        x: 14,
        y: 5,
    }
];

const aidKitSet = [
    {
        x: 3,
        y: 2,
    },
    {
        x: 3,
        y: 9,
    },
    {
        x: 12,
        y: 2,
    },
    {
        x: 13,
        y: 9,
    }
];

const groundList = convertFields(cellsList);
const map5 = { wallList, weaponSet, groundList, aidKitSet, ammunitionSet, spawnPoints};

export {map5}