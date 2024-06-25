import { window } from "./settings.js";
import { BattleGround } from "./BattleGround/BattleGround.js";
var canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const battleGround = ['11111', '10101','11011', '10101', '11111'];

canvas.width = window.w;
canvas.height = window.h;
ctx.fillStyle = window.c;
ctx.fillRect(0, 0, window.w, window.h);
let field = new BattleGround(battleGround, ctx);
field.drawfield();