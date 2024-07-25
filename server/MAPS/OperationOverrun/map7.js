import { WEAPON_MODELS } from "../../CONST/GAME/WEAPON/WEAPON_MODELS.js";
import {STATES} from "../../CONST/GAME/ENTITY/BOT.js";
import {ENTITY} from "../../CONST/GAME/ENTITY/ENTITY.js";
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

const area = {
    x: 430,
    y: 1950,
    radius: 300
}

const spawnPoints = [
    {
        x: 75,
        y: 75
    },
    {
        x: 75,
        y: 225
    },
    {
        x: 75,
        y: 375
    },
    {
        x: 75,
        y: 525
    }
]

const cellsList = [
    '1111011110011110',
    '1111011110111111',
    '1111011111111111',
    '1111011111111111',
    '1111011110111111',
    '0110011110011110',
    '0110001100000000',
    '1111001100001111',
    '1111101111101111',
    '1111101111101111',
    '1111101111111111',
    '1111101111111111',
    '1111101111101111',
    '1111001111100110',
    '0110000000000110',
    '1111100111001111',
    '1111100111101111',
    '1111111111101111',
    '1111111111111111',
    '1111100111111111',
    '1111100111101110',
];

const wallList = [
    [0, 0, 0, 4],
    [0, 5, 0, 9],
    [0, 11, 0, 15],
    [0, 0, 5, 0],
    [0, 4, 5, 4],
    [0, 5, 6, 5],
    [0, 9, 2, 9],
    [0, 11, 1, 11],
    [0, 15, 1, 15],
    [1, 10, 1, 11],
    [1, 12, 1, 13],
    [1, 15, 1, 16],
    [1, 16, 5, 16],
    [1, 7, 2, 7],
    [1, 10, 2, 10],
    [1, 12, 2, 12],
    [2, 1, 2, 2],
    [2, 9, 2, 10],
    [2, 1, 3, 1],
    [2, 14, 3, 14],
    [3, 3, 4, 3],
    [3, 5, 3, 6],
    [3, 8, 3, 9],
    [3, 14, 3, 15],
    [3, 15, 4, 15],
    [4, 6, 4, 7],
    [4, 7, 5, 7],
    [4, 9, 6, 9],
    [4, 9, 4, 10],
    [4, 10, 5, 10],
    [4, 11, 4, 12],
    [5, 0, 5, 1],
    [5, 1, 7, 1],
    [5, 3, 7, 3],
    [5, 3, 5, 4],
    [5, 10, 5, 11],
    [5, 11, 6, 11],
    [5, 13, 6, 13],
    [5, 15, 6, 15],
    [5, 15, 5, 16],
    [6, 5, 6, 6],
    [6, 6, 14, 6],
    [6, 8, 8, 8],
    [6, 8, 6, 9],
    [6, 11, 6, 15],
    [7, 0, 7, 1],
    [7, 0, 14, 0],
    [7, 3, 7, 4],
    [7, 4, 8, 4],
    [7, 12, 10, 12],
    [7, 12, 7, 16],
    [7, 16, 13, 16],
    [8, 1, 8, 2],
    [8, 3, 9, 3],
    [8, 4, 8, 5],
    [8, 5, 13, 5],
    [8, 8, 8, 11],
    [8, 11, 10, 11],
    [8, 14, 9, 14],
    [9, 3, 9, 4],
    [9, 4, 10, 4],
    [9, 9, 10, 9],
    [9, 9, 9, 10],
    [9, 13, 9, 15],
    [9, 15, 10, 15],
    [10, 0, 10, 1],
    [10, 6, 10, 7],
    [10, 11, 10, 12],
    [11, 2, 12, 2],
    [11, 13, 11, 14],
    [11, 14, 12, 14],
    [11, 15, 11, 16],
    [12, 1, 12, 2],
    [12, 3, 12, 4],
    [12, 7, 13, 7],
    [12, 9, 12, 10],
    [12, 11, 14, 11],
    [12, 11, 12, 12],
    [12, 12, 13, 12],
    [13, 2, 14, 2],
    [13, 4, 14, 4],
    [13, 4, 13, 5],
    [13, 7, 13, 8],
    [13, 12, 13, 13],
    [13, 13, 15, 13],
    [13, 15, 15, 15],
    [13, 15, 13, 16],
    [14, 0, 14, 1],
    [14, 1, 15, 1],
    [14, 3, 15, 3],
    [14, 3, 14, 4],
    [14, 6, 14, 11],
    [15, 0, 15, 1],
    [15, 0, 21, 0],
    [15, 3, 15, 5],
    [15, 5, 17, 5],
    [15, 7, 17, 7],
    [15, 7, 15, 10],
    [15, 10, 16, 10],
    [15, 12, 18, 12],
    [15, 12, 15, 13],
    [15, 15, 15, 16],
    [15, 16, 20, 16],
    [16, 3, 16, 4],
    [16, 4, 17, 4],
    [16, 8, 16, 9],
    [16, 9, 17, 9],
    [16, 10, 16, 11],
    [16, 11, 18, 11],
    [16, 13, 16, 14],
    [17, 0, 17, 1],
    [17, 5, 17, 7],
    [17, 8, 18, 8],
    [17, 14, 18, 14],
    [18, 1, 19, 1],
    [18, 10, 18, 12],
    [18, 14, 18, 15],
    [18, 15, 19, 15],
    [19, 1, 19, 2],
    [19, 2, 20, 2],
    [19, 3, 19, 4],
    [19, 5, 21, 5],
    [19, 5, 19, 7],
    [19, 7, 21, 7],
    [19, 9, 19, 10],
    [19, 10, 20, 10],
    [19, 13, 20, 13],
    [20, 11, 21, 11],
    [20, 11, 20, 12],
    [20, 12, 21, 12],
    [20, 13, 20, 14],
    [20, 15, 21, 15],
    [20, 15, 20, 16],
    [21, 0, 21, 5],
    [21, 7, 21, 11],
    [21, 12, 21, 15],
];

const weaponSet = [
    {
        id: 1,
        type: WEAPON_MODELS.glock, 
        x: 2,
        y: 2,
    },
    {
        id: 2,
        type: WEAPON_MODELS.uzi,
        x: 10,
        y: 3,
    },
    {
        id: 3,
        type: WEAPON_MODELS.glock,
        x: 17,
        y: 1,
    },
    {
        id: 4,
        type: WEAPON_MODELS.uzi,
        x: 18,
        y: 8,
    },
    {
        id: 5,
        type: WEAPON_MODELS.rifle, 
        x: 17,
        y: 14,
    },
    {
        id: 6,
        type: WEAPON_MODELS.shotGun, 
        x: 11, 
        y: 7, 
    },
    {
        id: 7,
        type: WEAPON_MODELS.rifle, 
        x: 9, 
        y: 12, 
    },
    {
        id: 8,
        type: WEAPON_MODELS.knife,
        x: 2, 
        y: 6, 
    },
];

const ammunitionSet = [
    {
        x: 1,
        y: 8,
    },
    {
        x: 1,
        y: 14,
    },
    {
        x: 4,
        y: 12,
    },
    {
        x: 6,
        y: 7,
    },
    {
        x: 8,
        y: 1,
    },
    {
        x: 12,
        y: 10,
    },
    {
        x: 11,
        y: 13,
    },
    {
        x: 16,
        y: 3,
    },
    {
        x: 18,
        y: 6,
    },
    {
        x: 18,
        y: 13,
    }
];

const aidKitSet = [
    {
        x: 4,
        y: 0,
    },
    {
        x: 1,
        y: 11,
    },
    {
        x: 4,
        y: 6,
    },
    {
        x: 4,
        y: 15,
    },
    {
        x: 9,
        y: 9,
    },
    {
        x: 11,
        y: 15,
    },
    {
        x: 13,
        y: 1,
    },
    {
        x: 15,
        y: 12,
    },
    {
        x: 16,
        y: 9,
    },
    {
        x: 19,
        y: 4,
    }
];

// 1373.2935059634483 104.6360389693271, 1983.2194795587563 501.5405845398269,
// 2790.053570062023 681.0883117545835, 2996.6012972767794 1207.0035713374841,
// 2420.6788950189375 2232.6610383316183, 1792.8626612030102 2232.848375853163,
// 1840.6860376938732 1327.731493398836, 739.6753236814657 1215.8162338159377,
// 303.4951288348593 1609.1025971044564

const bots = [
    {
        current: {
            x: 1373,
            y: 104
        },
        skinId: 0,
        state: STATES.wanders,
        health: 5,
        maxHealth: ENTITY.maxHealth,
        id: "bot_0",
        shooting: false,
        isAlive: true,
        deviation: 0.15,
        rapidity: 700,
    },
    {
        current: {
            x: 1983,
            y: 501
        },
        skinId: 1,
        state: STATES.wanders,
        health: 7,
        maxHealth: ENTITY.maxHealth,
        id: "bot_1",
        shooting: false,
        isAlive: true,
        deviation: 0.13,
        rapidity: 500,
    },
    {
        current: {
            x: 2790,
            y: 681
        },
        skinId: 0,
        state: STATES.wanders,
        health: 9,
        maxHealth: ENTITY.maxHealth,
        id: "bot_2",
        shooting: false,
        isAlive: true,
        deviation: 0.12,
        rapidity: 400,
    },
    {
        current: {
            x: 2996,
            y: 1207
        },
        skinId: 1,
        state: STATES.wanders,
        health: 10,
        maxHealth: ENTITY.maxHealth,
        id: "bot_3",
        shooting: false,
        isAlive: true,
        deviation: 0.11,
        rapidity: 350,
    },
    {
        current: {
            x: 2420,
            y: 2232
        },
        skinId: 1,
        state: STATES.wanders,
        health: 10,
        maxHealth: ENTITY.maxHealth,
        id: "bot_4",
        shooting: false,
        isAlive: true,
        deviation: 0.1,
        rapidity: 300,
    },
    {
        current: {
            x: 1792,
            y: 2232
        },
        skinId: 1,
        state: STATES.wanders,
        health: 7,
        maxHealth: ENTITY.maxHealth,
        id: "bot_5",
        shooting: false,
        isAlive: true,
        deviation: 0.09,
        rapidity: 200,
    },
    {
        current: {
            x: 1840,
            y: 1327
        },
        skinId: 1,
        state: STATES.wanders,
        health: 10,
        maxHealth: ENTITY.maxHealth,
        id: "bot_6",
        shooting: false,
        isAlive: true,
        deviation: 0.08,
        rapidity: 200,
    },
    {
        current: {
            x: 739,
            y: 1215
        },
        skinId: 1,
        state: STATES.wanders,
        health: 8,
        maxHealth: ENTITY.maxHealth,
        id: "bot_7",
        shooting: false,
        isAlive: true,
        deviation: 0.08,
        rapidity: 150,
    },
    {
        current: {
            x: 303,
            y: 1609
        },
        skinId: 1,
        state: STATES.wanders,
        health: 20,
        maxHealth: ENTITY.maxHealth,
        id: "bot_8",
        shooting: false,
        isAlive: true,
        deviation: 0.2,
        rapidity: 200,
    },
];

const groundList = convertFields(cellsList);
const map7 = { wallList, weaponSet, groundList, aidKitSet, ammunitionSet, spawnPoints, area, bots};

export {map7}