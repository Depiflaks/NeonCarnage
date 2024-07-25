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
        x: 3825,
        y: 75
    },
    {
        x: 3825,
        y: 3375
    },
    {
        x: 75,
        y: 3375
    }
]

const cellsList = [
    '111111000000000000111111',
    '111111000000000000111111',
    '111111000000000000111111',
    '111111110111111011111111',
    '111111111111111111111111',
    '111111011111111110111111',
    '111111000111111000111111',
    '000110011111111110001100',
    '000111010001100010111100',
    '000011010011110010110000',
    '000111110111111011111000',
    '000111110111111011111000',
    '000111111111111111111000',
    '000111111111111111111000',
    '000111110111111011111000',
    '000111110111111011111000',
    '000011010011110010110000',
    '000111010001100010111000',
    '000110011111111110011000',
    '111111000111111000111111',
    '111111011111111110111111',
    '111111111111111111111111',
    '111111110111111011111111',
    '111111000000000000111111',
    '111111000000000000111111',
    '111111000000000000111111',
];

const wallList = [
    [0, 0, 7, 0],
    [0, 0, 0, 6],
    [0, 6, 4, 6],
    [0, 18, 0, 24],
    [0, 18, 4, 18],
    [0, 24, 7, 24],
    [1, 2, 2, 2],
    [1, 19, 2, 19],
    [1, 22, 2, 22],
    [2, 1, 3, 1],
    [2, 1, 2, 2],
    [2, 4, 2, 5],
    [2, 5, 3, 5],
    [2, 20, 3, 20],
    [2, 20, 2, 21],
    [2, 22, 2, 23],
    [2, 23, 3, 23],
    [3, 6, 3, 8],
    [3, 8, 4, 8],
    [3, 9, 4, 9],
    [3, 9, 3, 15],
    [3, 15, 4, 15],
    [3, 16, 4, 16],
    [3, 16, 3, 18],
    [3, 12, 4, 12],
    [4, 3, 4, 4],
    [4, 8, 4, 9],
    [4, 15, 4, 16],
    [4, 21, 4, 22],
    [5, 2, 6, 2],
    [5, 5, 6, 5],
    [5, 6, 7, 6],
    [5, 6, 5, 7],
    [5, 7, 6, 7],
    [5, 11, 6, 11],
    [5, 13, 6, 13],
    [5, 13, 5, 14],
    [5, 17, 6, 17],
    [5, 17, 5, 18],
    [5, 18, 7, 18],
    [5, 20, 6, 20],
    [6, 1, 6, 3],
    [6, 7, 6, 9],
    [6, 9, 7, 9],
    [6, 11, 6, 12],
    [6, 12, 7, 12],
    [6, 15, 7, 15],
    [6, 15, 6, 17],
    [6, 19, 6, 20],
    [6, 22, 9, 22],
    [7, 0, 7, 3],
    [7, 3, 9, 3],
    [7, 5, 8, 5],
    [7, 5, 7, 6],
    [7, 7, 10, 7],
    [7, 7, 7, 9],
    [7, 15, 7, 17],
    [7, 17, 10, 17],
    [7, 18, 7, 20],
    [7, 20, 8, 20],
    [7, 22, 7, 24],
    [8, 5, 8, 6],
    [8, 6, 11, 6],
    [8, 8, 12, 8],
    [8, 8, 8, 11],
    [8, 11, 9, 11],
    [8, 13, 9, 13],
    [8, 13, 8, 16],
    [8, 16, 12, 16],
    [8, 18, 10, 18],
    [8, 18, 8, 20],
    [9, 3, 9, 4],
    [9, 4, 10, 4],
    [9, 10, 10, 10],
    [9, 10, 9, 11],
    [9, 13, 9, 14],
    [9, 14, 10, 14],
    [9, 20, 10, 20],
    [9, 20, 9, 22],
    [10, 3, 10, 4],
    [10, 3, 16, 3],
    [10, 6, 10, 7],
    [10, 9, 12, 9],
    [10, 9, 10, 10],
    [10, 13, 11, 13],
    [10, 14, 10, 15],
    [10, 15, 12, 15],
    [10, 17, 10, 18],
    [10, 20, 10, 21],
    [10, 21, 16, 21],
    [11, 12, 11, 13],
    [11, 19, 12, 19],
    [12, 4, 13, 4],
    [12, 8, 12, 10],
    [12, 11, 12, 12],
    [12, 15, 12, 17],
    [12, 18, 12, 19],
    [13, 4, 13, 5],
    [13, 5, 14, 5],
    [13, 10, 14, 10],
    [13, 14, 14, 14],
    [14, 8, 18, 8],
    [14, 8, 14, 9],
    [14, 9, 16, 9],
    [14, 10, 14, 11],
    [14, 11, 15, 11],
    [14, 15, 16, 15],
    [14, 15, 14, 16],
    [14, 16, 18, 16],
    [14, 17, 14, 18],
    [14, 19, 15, 19],
    [14, 19, 14, 20],
    [15, 6, 15, 7],
    [15, 12, 15, 13],
    [15, 13, 16, 13],
    [16, 3, 16, 4],
    [16, 4, 17, 4],
    [16, 6, 18, 6],
    [16, 6, 16, 7],
    [16, 7, 19, 7],
    [16, 9, 16, 10],
    [16, 10, 17, 10],
    [16, 14, 17, 14],
    [16, 14, 16, 15],
    [16, 17, 19, 17],
    [16, 17, 16, 18],
    [16, 18, 18, 18],
    [16, 20, 17, 20],
    [16, 20, 16, 21],
    [17, 3, 19, 3],
    [17, 3, 17, 4],
    [17, 10, 17, 11],
    [17, 11, 18, 11],
    [17, 13, 18, 13],
    [17, 13, 17, 14],
    [17, 20, 17, 21],
    [17, 21, 19, 21],
    [18, 5, 19, 5],
    [18, 5, 18, 6],
    [18, 8, 18, 11],
    [18, 13, 18, 16],
    [18, 18, 18, 19],
    [18, 19, 19, 19],
    [19, 0, 26, 0],
    [19, 0, 19, 3],
    [19, 5, 19, 6],
    [19, 6, 21, 6],
    [19, 7, 19, 9],
    [19, 9, 20, 9],
    [19, 15, 20, 15],
    [19, 15, 19, 17],
    [19, 18, 21, 18],
    [19, 18, 19, 19],
    [19, 21, 19, 24],
    [19, 24, 26, 24],
    [20, 7, 21, 7],
    [20, 7, 20, 10],
    [20, 12, 21, 12],
    [20, 12, 20, 13],
    [20, 15, 20, 17],
    [20, 17, 21, 17],
    [20, 20, 21, 20],
    [21, 1, 21, 3],
    [21, 3, 22, 3],
    [21, 6, 21, 7],
    [21, 11, 21, 12],
    [21, 14, 22, 14],
    [21, 17, 21, 18],
    [21, 19, 21, 20],
    [21, 21, 21, 22],
    [21, 22, 23, 22],
    [22, 4, 22, 5],
    [22, 8, 23, 8],
    [22, 8, 22, 9],
    [22, 9, 23, 9],
    [22, 11, 23, 11],
    [22, 13, 22, 14],
    [22, 15, 23, 15],
    [22, 15, 22, 16],
    [22, 16, 23, 16],
    [23, 6, 26, 6],
    [23, 6, 23, 8],
    [23, 9, 23, 15],
    [23, 16, 23, 18],
    [23, 18, 26, 18],
    [23, 20, 24, 20],
    [23, 22, 23, 23],
    [24, 1, 24, 2],
    [24, 2, 25, 2],
    [24, 4, 25, 4],
    [24, 4, 24, 5],
    [24, 21, 25, 21],
    [24, 21, 24, 22],
    [25, 3, 25, 4],
    [26, 0, 26, 6],
    [26, 18, 26, 24],
];

const area = {
    x: 1500,
    y: 1500,
    radius: 3500
}

const weaponSet = [
    {
        id: 1,
        type: WEAPON_MODELS.glock, 
        x: 1,
        y: 22,
    },
    {
        id: 2,
        type: WEAPON_MODELS.uzi,
        x: 1,
        y: 1,
    },
    {
        id: 3,
        type: WEAPON_MODELS.glock,
        x: 24,
        y: 0,
    },
    {
        id: 4,
        type: WEAPON_MODELS.uzi,
        x: 25,
        y: 22,
    },
    {
        id: 5,
        type: WEAPON_MODELS.rifle, 
        x: 5,
        y: 11,
    },
    {
        id: 6,
        type: WEAPON_MODELS.shotGun, 
        x: 13, 
        y: 19, 
    },
    {
        id: 7,
        type: WEAPON_MODELS.rifle, 
        x: 20, 
        y: 12, 
    },
    {
        id: 8,
        type: WEAPON_MODELS.shotGun, 
        x: 14, 
        y: 4, 
    },
    {
        id: 9,
        type: WEAPON_MODELS.knife,
        x: 15, 
        y: 10, 
    },
    {
        id: 10,
        type: WEAPON_MODELS.knife,
        x: 10, 
        y: 14, 
    },
];

const ammunitionSet = [
    {
        x: 3,
        y: 18,
    },
    {
        x: 5,
        y: 9,
    },
    {
        x: 6,
        y: 3,
    },
    {
        x: 12,
        y: 16,
    },
    {
        x: 13,
        y: 13,
    },
    {
        x: 13,
        y: 7,
    },
    {
        x: 20,
        y: 19,
    },
    {
        x: 22,
        y: 10,
    }
];

const aidKitSet = [
    {
        x: 5,
        y: 22,
    },
    {
        x: 2,
        y: 4,
    },
    {
        x: 7,
        y: 13,
    },
    {
        x: 11,
        y: 6,
    },
    {
        x: 11,
        y: 18,
    },
    {
        x: 12,
        y: 11,
    },
    {
        x: 19,
        y: 10,
    },
    {
        x: 20,
        y: 4,
    },
    {
        x: 21,
        y: 17,
    }
];

const groundList = convertFields(cellsList);
const map1 = { wallList, weaponSet, groundList, aidKitSet, ammunitionSet, spawnPoints, area };

export {map1}