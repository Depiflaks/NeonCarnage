import { WINDOW, CAMERA } from "./settings.js";
import { BattleGround } from "./BattleGround/BattleGround.js";
import { PlayerModel } from './Player/PlayerModel.js';
import { PlayerView } from './Player/PlayerView.js';
import { PlayerController } from './Player/PlayerController.js';
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
const weaponSet = [
    {name: "wep1", 
        x: 3, 
        y: 2, 
        battleType: "close",  //ближний или дальний бой
        rapidity: 10,           //скорострельность
        grouping: 10,           //кучность
        deviation: 10,          //отклонение
        onGround: "pink",       //текстура на земле
        inHand: "red"},         //текстура в руках
    {name: "wep2",
        x: 10,
        y: 5,
        battleType: "close",
        rapidity: 10,
        grouping: 10,
        deviation: 10,
        onGround: "pink",
        inHand: "red"}];
const groundList = [];

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

canvas.width = WINDOW.w;
canvas.height = WINDOW.h;
context.fillStyle = WINDOW.c;
context.fillRect(0, 0, WINDOW.w, WINDOW.h);
const field = new BattleGround(groundList, wallList, weaponSet, context);

const playerModel = new PlayerModel(1000, 1000);
const playerView = new PlayerView(context);
const playerController = new PlayerController(playerModel, playerView);

play();

function moveFrame() {
    const [dx, dy] = [CAMERA.center.x - playerModel.getPosition().x, CAMERA.center.y - playerModel.getPosition().y];
    const period = (Math.abs(dx) + Math.abs(dy) < 0.5) ? 1 : CAMERA.period;
    field.move(dx / period, dy / period);
    playerModel.move(dx / period, dy / period);
}

function drawFrame() {
    field.drawGround();
    field.drawWalls();
    field.drawWeapons();
}

function play() {
    field.clearFrame();
    drawFrame();
    playerController.update();
    moveFrame();
    requestAnimationFrame(play);
}