const RAD = Math.PI / 180;
const FPS = 90;
const RPS = 40;
const FRAME_DURATION = 1000 / FPS;
const REQUEST_DURATION = 1000 / RPS;

const WINDOW = {
    w: 1920,
    h: 1080,
    c: "black",
};

const LEADER_BOARD = {
    w: 600,
    h: 200,
    amount: 1200,
};

const INTERFACE = {
    cursor: "public/assets/Interface/cursor.png",
}

const SHAKE = {
    duration: 2,
    scale: 10,
    relocateRange: 5, // scale / 2
}

const CAMERA = {
    center: {
        x: WINDOW.w / 2,
        y: WINDOW.h / 2,
    },
    period: 10,
};

const KEYBOARD_E = 'KeyE';

const KEYBOARD_F = 'KeyF'; 

const GAME_MODE = {
    BattleRoyale: 0,
    DeathMatch: 1,
    SurvivalRun: 2
}

export {RAD, FPS, RPS, FRAME_DURATION, REQUEST_DURATION, WINDOW, LEADER_BOARD, INTERFACE, SHAKE, CAMERA, KEYBOARD_E, KEYBOARD_F, GAME_MODE};