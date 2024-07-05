import { EngineController } from "./Engine/EngineController.js";
import { groundList, wallList, weaponSet } from "./data.js";

const canvas = document.getElementById("canvas");

const gameController = new EngineController(
    {
        cellsList: groundList,
        wallsList: wallList,
        weaponList: weaponSet
    },
    {
        x: 1420,
        y: 682,
    },
    canvas
);

gameController.loop();