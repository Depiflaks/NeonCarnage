import { GameController } from "./Game/GameController.js";
import { GameModel } from "./Game/GameModel.js";
import { GameView } from "./Game/GameView.js";
import { groundList, wallList, weaponSet } from "./data.js";

const canvas = document.getElementById("canvas");

const gameController = new GameController(
    {
        cellsList: groundList,
        wallsList: wallList,
        weaponList: weaponSet
    },
    {
        x: 1000,
        y: 1000,
    },
    canvas
);

gameController.play();