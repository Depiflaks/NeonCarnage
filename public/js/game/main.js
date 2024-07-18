import { Game } from "./Game/Game.js";

const data = JSON.parse(localStorage.getItem("responseData"))
const game = new Game(
    data,
    document
);

game.loop();