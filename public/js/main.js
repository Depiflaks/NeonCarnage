import { window } from "./settings.js";
import { BattleGround } from "./BattleGround/BattleGround.js";
import { Player } from "./Player/Player.js";
var canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const cellsList = [
    '1111111011', 
    '1010110010',
    '1100111011', 
    '1011001111', 
    '1111110110', 
    '0110111111', 
    '1101111100', 
    '1001110011', 
    '1111011011', 
    '0111001101', 
    '1110111011', 
    '1011011110', 
    '0110111001', 
    '1110101111'];
const wallList = [[2, 0, 2, 1], [1, 4, 1, 5], [2, 5, 3, 5], [3, 8, 3, 9], [5, 2, 5, 3], [5, 6, 5, 5], [5, 8, 4, 8], [6, 4, 7, 4], [8, 8, 8, 9], [8, 2, 9, 2], [9, 4, 9, 3], [10, 6, 11, 6], [12, 2, 13, 2], [12, 5, 12, 6]];
var groundList = [];

function convertFields(cellsList) {
    for (let i = 0; i < cellsList.length; i++) {
        for (let j = 0; j < cellsList[i].length; j++) {
            if (cellsList[i][j] === '1') {
                groundList.push([i, j]);
            }
        }
    }
}
convertFields(cellsList);

canvas.width = window.w;
canvas.height = window.h;
context.fillStyle = window.c;
context.fillRect(0, 0, window.w, window.h);
let field = new BattleGround(groundList, wallList, context);

let p = new Player(500, 500, 0, context);


play();

function play() {
    field.clearFrame();
    field.drawGround();
    p.draw();
    field.drawWalls();
    requestAnimationFrame(play);
}