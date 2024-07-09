import { GameController } from "./Game/GameController.js";

const data = JSON.parse(localStorage.getItem("responseData"))
const gameController = new GameController(
    data,
    document
);

gameController.loop();