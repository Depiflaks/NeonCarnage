import { GameController } from "./Game/GameController.js";

const data = JSON.parse(localStorage.getItem("responseData"))
const gameController = new GameController(
    data,
    {
        x: 1420,
        y: 682,
    },
    document
);

gameController.loop();