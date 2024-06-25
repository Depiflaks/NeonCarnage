import { window } from "./settings.js";
import { BattleGround } from "./BattleGround/BattleGround.js";
import { Player } from "./Player/Player.js";
var canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const groundList = ['11111', '10101','11011', '10101', '11111'];
const wallList = [[50, 100, 200, 100], [30, 400, 30, 500]];

canvas.width = window.w;
canvas.height = window.h;
canvasContext.fillStyle = window.c;
canvasContext.fillRect(0, 0, window.w, window.h);
let field = new BattleGround(groundList, wallList, canvasContext);
field.drawfield();
//field.drawwalls();

let p = new Player(100, 100, 0, canvasContext);


play();

function play() {
    field.clearFrame();
    field.drawfield();
    p.draw();
    requestAnimationFrame(play);
}