// CONST.js
const RAD = Math.PI / 180;
const FPS = 90;
const DURATION = 1000 / FPS;

const SERVER = {
    sergey: 'ws://10.250.104.142:8000/',
    sergey_home: 'ws://192.168.1.131:8000/',
    ignat: 'ws://10.250.104.176:8000/',
}

const WINDOW = {
    w: 1200,
    h: 900,
    c: "black",
};

const CELL = {
    w: 150,
    h: 150,
    activeAlpha: 0,
    inactiveAlpha: 0.5,
    deltaAlpha: 0.01,
    src: "public/assets/BattleGround/cell.png",
};

const WALL = {
    h: 15,
    verticalStartImage: "public/assets/BattleGround/verticalWallStart.png",
    verticalEndImage: "public/assets/BattleGround/verticalWallEnd.png",
    verticalBetweenImage: "public/assets/BattleGround/verticalWallBetween.png",
    verticalImage: "public/assets/BattleGround/verticalWall.png",
    horizontalStartImage: "public/assets/BattleGround/horizontalWallStart.png",
    horizontalEndImage: "public/assets/BattleGround/horizontalWallEnd.png",
    horizontalBetweenImage: "public/assets/BattleGround/horizontalWallBetween.png",
    horizontalImage: "public/assets/BattleGround/horizontalWall.png"
}

const ENTITY = {
    radius: 30,
    w: 100,
    h: 60,
    wWithWeapon: 120,
    hWithWeapon: 120,
    headColor: "public/assets/Player/Skin3/head.png",
    bodyColor: "public/assets/Player/Skin3/body.png",
    bodyWithWeapon: "public/assets/Player/Skin3/bodyWithWeapon.png",
    speed: 8,
    visualField: {
        range: 600,
        angleStep: 15 * RAD,
    },
    pythagoreanFactor: Math.sqrt(2) / 2,
};

const CAMERA = {
    center: {
        x: WINDOW.w / 2,
        y: WINDOW.h / 2,
    },
    period: 10,
};

const WEAPON = {
    w: 80,
    h: 120,
    minDistance: 40

};

const BULLET = {
    w: 5,
    h: 70,
    radius: 70,
    speed: 20,
    pythagoreanFactor: Math.sqrt(2) / 2,
    color: "yellow",
};

const ENEMY = {
    period: 10,
}

const KEYBOARD_E = 'KeyE';

const WEAPON_STATE = {
    onTheGround: 0,
    inTheHand: 1,
};

const TRAJECTORY = {
    width: 150,
    height: 10,
    deltaAngle: Math.PI / 3,
    animationSpeed: 0.05,
    strokeStyle: "red"
};

export {WINDOW, CELL, WALL, ENTITY, BULLET, WEAPON, CAMERA, KEYBOARD_E, WEAPON_STATE, RAD, FPS, DURATION, TRAJECTORY, SERVER, ENEMY};
