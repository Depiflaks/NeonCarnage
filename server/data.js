import { WEAPON_MODELS } from "../public/js/game/CONST.js";
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

const cellsList = [
    '0000000001111110000000', 
    '0000000001111110000000',
    '0111100111111110000000', 
    '0111101111111111111111', 
    '0111111101111111111111', 
    '0111111000011110011111', 
    '0111111000011100011111', 
    '0111111111111100011111', 
    '0111111111101001111111', 
    '0111100001001001111111', 
    '0000000011111101111111', 
    '0000000011111111111111', 
    '0000011111111100011000', 
    '0001111111111100011000',
    '1111110011111111111000',
    '1111100011111101111000',
    '1111100000110001111000',
    '1111100000110001111000',
    '1111100111100011111000',
    '1111111111100011110000',
    '1111111111100011110000',
    '0000000111110011110000',
    '0000000111111111110000',
    '0000000111111111110000',
    '0000000111110011110000',
    '0000000111110000000000'
];

const wallList = [
    [0, 9, 0, 15], 
    [0, 9, 2, 9], 
    [0, 15, 3, 15], 
    [1, 11, 3, 11],
    [1, 13, 2, 13], 
    [2, 1, 2, 5], 
    [2, 7, 2, 9], 
    [2, 13, 2, 15], 
    [2, 1, 10, 1], 
    [2, 5, 5, 5], 
    [2, 7, 3, 7], 
    [3, 6, 3, 7],
    [3, 10, 3, 11],
    [3, 15, 3, 22],
    [3, 6, 4, 6],
    [3, 16, 4, 16],
    [3, 20, 5, 20],
    [3, 22, 12, 22],
    [4, 1, 4, 3], 
    [4, 8, 4, 9], 
    [4, 5, 4, 6], 
    [4, 12, 4, 14], 
    [4, 3, 5, 3],
    [4, 8, 5, 8], 
    [4, 9, 5, 9], 
    [4, 12, 6, 12],
    [5, 7, 5, 8], 
    [5, 9, 5, 11],
    [5, 15, 5, 18],
    [5, 19, 5, 20],
    [5, 7, 7, 7],
    [5, 11, 7, 11],
    [5, 15, 6, 15],
    [5, 17, 8, 17],
    [5, 19, 6, 19],
    [6, 4, 8, 4],
    [6, 4, 6, 6],
    [6, 12, 6, 13],
    [6, 14, 6, 15],
    [6, 14, 8, 14],
    [7, 6, 7, 11],
    [7, 20, 7, 21],
    [7, 18, 8, 18],
    [7, 20, 8, 20],
    [8, 2, 8, 4],
    [8, 11, 8, 12],
    [8, 13, 8, 14],
    [8, 15, 8, 18],
    [8, 19, 8, 20],
    [8, 8, 9, 8],
    [8, 11, 9, 11],
    [8, 12, 10, 12],
    [8, 13, 10, 13],
    [8, 15, 11, 15],
    [8, 19, 9, 19],
    [9, 5, 9, 9],
    [9, 10, 9, 11],
    [9, 5, 10, 5],
    [9, 9, 10, 9],
    [9, 10, 10, 10],
    [9, 16, 11, 16],
    [10, 1, 10, 5],
    [10, 8, 10, 9],
    [10, 10, 10, 12],
    [10, 13, 10, 14],
    [10, 15, 10, 16],
    [10, 18, 10, 19],
    [10, 8, 12, 8],
    [10, 11, 11, 11],
    [10, 14, 11, 14],
    [10, 19, 19, 19],
    [11, 14, 11, 15],
    [11, 10, 12, 10],
    [12, 5, 12, 8],
    [12, 9, 12, 10],
    [12, 8, 13, 8],
    [12, 12, 12, 13],
    [12, 12, 14, 12],
    [12, 14, 12, 18],
    [12, 19, 12, 22],
    [12, 5, 13, 5],
    [12, 14, 14, 14],
    [12, 17, 14, 17],
    [13, 3, 13, 5],
    [13, 3, 14, 3],
    [14, 0, 14, 3],
    [14, 6, 14, 8],
    [14, 9, 14, 10],
    [14, 11, 14, 12],
    [14, 14, 14, 17],
    [14, 0, 21, 0],
    [14, 6, 15, 6],
    [14, 8, 16, 8],
    [14, 9, 15, 9],
    [14, 18, 16, 18],
    [15, 4, 15, 6],
    [15, 14, 15, 15],
    [15, 2, 17, 2],
    [15, 5, 19, 5],
    [15, 14, 16, 14],
    [15, 15, 18, 15],
    [16, 1, 16, 2],
    [16, 8, 16, 10],
    [16, 11, 16, 14],
    [16, 16, 16, 18],
    [16, 10, 18, 10],
    [16, 12, 18, 12],
    [16, 16, 17, 16],
    [17, 2, 17, 3],
    [18, 3, 18, 4],
    [18, 7, 18, 10],
    [18, 11, 18, 12],
    [18, 14, 18, 16],
    [18, 3, 20, 3],
    [18, 7, 19, 7],
    [18, 11, 21, 11],
    [18, 14, 22, 14],
    [18, 18, 25, 18],
    [19, 5, 19, 7],
    [19, 8, 19, 9],
    [19, 17, 19, 19],
    [19, 9, 20, 9],
    [20, 2, 20, 3],
    [20, 7, 26, 7],
    [20, 9, 20, 10],
    [20, 14, 20, 16],
    [20, 17, 21, 17],
    [21, 0, 21, 7],
    [21, 9, 21, 12],
    [21, 12, 22, 12],
    [22, 10, 23, 10],
    [22, 12, 22, 14],
    [22, 16, 22, 17],
    [22, 16, 25, 16],
    [23, 8, 23, 10],
    [23, 8, 24, 8],
    [23, 12, 23, 13],
    [23, 13, 24, 13],
    [23, 15, 23, 16],
    [24, 11, 25, 11],
    [24, 12, 24, 14],
    [24, 12, 26, 12],
    [24, 14, 25, 14],
    [25, 10, 25, 11],
    [25, 14, 25, 18],
    [26, 7, 26, 12]
];

const weaponSet = [
    {
        id: 1,
        type: WEAPON_MODELS.glock, 
        x: 6,
        y: 2,
    },
    {
        id: 2,
        type: WEAPON_MODELS.machineGun,
        x: 13,
        y: 12,
    },
    {
        id: 3,
        type: WEAPON_MODELS.pistol,
        x: 9,
        y: 20,
    },
    {
        id: 4,
        type: WEAPON_MODELS.glock,
        x: 16,
        y: 3,
    },
    {
        id: 5,
        type: WEAPON_MODELS.pistol, 
        x: 20,
        y: 16,
    },
    {
        id: 6,
        type: WEAPON_MODELS.glock, 
        x: 24, 
        y: 9, 
    },
    {
        id: 7,
        type: WEAPON_MODELS.rifle, 
        x: 8, 
        y: 7, 
    },
    {
        id: 8,
        type: WEAPON_MODELS.rifle, 
        x: 15, 
        y: 15, 
    },
    {
        id: 9,
        type: WEAPON_MODELS.rifle, 
        x: 18, 
        y: 10, 
    },
    {
        id: 10,
        type: WEAPON_MODELS.knife, 
        x: 7, 
        y: 12, 
    },
    {
        id: 11,
        type: WEAPON_MODELS.machineGun, 
        x: 13, 
        y: 6, 
    },
];

const ammunitionSet = [
    {
        x: 3,
        y: 7,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 40
    },
    {
        x: 3,
        y: 20,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 30
    },
    {
        x: 5,
        y: 12,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 35
    },
    {
        x: 7,
        y: 5,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 45
    },
    {
        x: 9,
        y: 12,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 30
    },
    {
        x: 9,
        y: 17,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 35
    },
    {
        x: 11,
        y: 9,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 20
    },
    {
        x: 13,
        y: 4,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 40
    },
    {
        x: 14,
        y: 9,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 30
    },
    {
        x: 18,
        y: 3,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 35
    },
    {
        x: 18,
        y: 9,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 55
    },
    {
        x: 18,
        y: 14,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 40
    },
    {
        x: 22,
        y: 12,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 35
    }
];

const bonusSet = [
    {
        x: 1,
        y: 10,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 5,
    },
    {
        x: 3,
        y: 2,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 5,
    },
    {
        x: 6,
        y: 18,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 5,
    },
    {
        x: 8,
        y: 9,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 5,
    },
    {
        x: 11,
        y: 15,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 5,
    },
    {
        x: 12,
        y: 7,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 5,
    },
    {
        x: 12,
        y: 10,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 5,
    },
    {
        x: 17,
        y: 17,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 5,
    },
    {
        x: 18,
        y: 1,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 5,
    },
    {
        x: 19,
        y: 6,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 5,
    },
    {
        x: 22,
        y: 10,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 5,
    },
];


const groundList = convertFields(cellsList);

export {wallList, weaponSet, groundList, bonusSet, ammunitionSet}