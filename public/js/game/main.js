import { GameController } from "./Game/GameController.js";
import { groundList, wallList, weaponSet, bonusSet, ammunitionSet } from "./data.js";

const gameController = new GameController(
    {
        cellsList: groundList,
        wallsList: wallList,
        weaponList: weaponSet,
        bonusSet: bonusSet,
        ammunitionSet: ammunitionSet
    },
    {
        x: 1420,
        y: 682,
    },
    document
);

console.log(localStorage.getItem("responseData"));

gameController.start();