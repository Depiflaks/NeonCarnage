import { GameController } from "./Game/GameController.js";
import { groundList, wallList, weaponSet } from "./data.js";

const gameController = new GameController(
    {
        cellsList: groundList,
        wallsList: wallList,
        weaponList: weaponSet
    },
    {
        x: 1420,
        y: 682,
    },
    document
);

gameController.start();