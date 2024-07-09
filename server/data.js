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
    '1111111111', 
    '1111111111',
    '1111111111', 
    '1111111111', 
    '1111111111', 
    '1111111111', 
    '1111111111', 
    '1111111111', 
    '1111111111', 
    '1111111111', 
    '1111111111', 
    '1111111111', 
    '1111111111', 
    '1111111111'];

const wallList = [
    [0, 0, 0, 10], 
    [0, 0, 14, 0], 
    [0, 10, 14, 10], 
    [14, 0, 14, 10], 
    [1, 6, 1, 7], 
    [1, 7, 2, 7], 
    [2, 2, 2, 3], 
    [3, 5, 4, 5], 
    [3, 8, 4, 8], 
    [3, 8, 3, 9], 
    [4, 2, 5, 2], 
    [4, 3, 4, 6], 
    [4, 3, 5, 3], 
    [6, 0, 6, 1], 
    [4, 6, 8, 6], 
    [10, 6, 11, 6], 
    [8, 1, 10, 1], 
    [7, 3, 8, 3], 
    [8, 3, 8, 6], 
    [8, 8, 8, 10], 
    [12, 1, 12, 3], 
    [11, 8, 13, 8], 
    [13, 5, 14, 5]
];

const weaponSet = [
    {
        id: 0,
        type: WEAPON_MODELS.knife, 
        x: 3, 
        y: 6, 
    },
    {
        id: 1,
        type: WEAPON_MODELS.rifle, 
        x: 10,
        y: 5,
    },
    {
        id: 2,
        type: WEAPON_MODELS.machineGun,
        x: 6,
        y: 2,
    },
    {
        id: 3,
        type: WEAPON_MODELS.pistol,
        x: 7,
        y: 9,
    },
    {
        id: 4,
        type: WEAPON_MODELS.glock,
        x: 8,
        y: 7,
    }
];

const ammunitionSet = [
    {
        x: 10,
        y: 7,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 40
    },
    {
        x: 7,
        y: 7,
        image: "public/assets/Bonuses/cartridges.png",
        amount: 95
    }
];

const bonusSet = [
    {
        x: 7,
        y: 4,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 1,
    },
    {
        x: 5,
        y: 5,
        image: "public/assets/Bonuses/aidKit.png",
        amount: 2,
    }
];


const groundList = convertFields(cellsList);

export {wallList, weaponSet, groundList, bonusSet, ammunitionSet}