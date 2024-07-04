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
        name: "wep1", 
        x: 10, 
        y: 6, 
        battleType: "close",  //ближний или дальний бой
        rapidity: 10,           //скорострельность (задержка в миллисек)
        grouping: 10,           //кучность
        deviation: 0.5,          //отклонение
        onGround: "pink",       //текстура на земле
        inHand: "white", //текстура в руках
        amount: 0, //количество пуль в магазине(для холодного - 0)
        rechargeTime: 0 //время перезарядки
    },         
    {
        name: "wep2",
        x: 10,
        y: 5,
        battleType: "distant",
        rapidity: 100,
        grouping: 1,
        deviation: 0.05,
        onGround: "pink",
        inHand: "white",
        amount: 80,
        rechargeTime: 3000
    }
];

const playerSet = {
    x: 1440,
    y: 700
};


const groundList = convertFields(cellsList);

export {wallList, weaponSet, groundList, playerSet}