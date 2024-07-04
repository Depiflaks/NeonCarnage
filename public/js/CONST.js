const RAD = Math.PI / 180;
const FPS = 90;
const DURATION = 1000 / FPS;

const WINDOW = {
    w: 1400,
    h: 1080,
    c: "black",
};

const CELL = {
    w: 150,
    h: 150,
    activeAlpha: 0,
    inactiveAlpha: 0.4,
    deltaAlpha: 0.01,
    src: "../../assets/BattleGround/cell.png",
};


const WALL = {
    h: 15,
    verticalStartImage: "../../assets/BattleGround/verticalWallStart.png",
    verticalEndImage: "../../assets/BattleGround/verticalWallEnd.png",
    verticalBetweenImage: "../../assets/BattleGround/verticalWallBetween.png",
    verticalImage: "../../assets/BattleGround/verticalWall.png",
    horizontalStartImage: "../../assets/BattleGround/horizontalWallStart.png",
    horizontalEndImage: "../../assets/BattleGround/horizontalWallEnd.png",
    horizontalBetweenImage: "../../assets/BattleGround/horizontalWallBetween.png",
    horizontalImage: "../../assets/BattleGround/horizontalWall.png"
}

const PLAYER = {
    radius: 30,
    w: 100,
    h: 60,
    wWithWeapon: 120,
    hWithWeapon: 120,
    headColor: "../../assets/Player/Skin3/head.png",
    bodyColor: "../../assets/Player/Skin3/body.png",
    bodyWithWeapon: "../../assets/Player/Skin3/bodyWithWeapon.png",
    speed: 6,
    visualField: {
        range: 600,
        angleStep: 15 * RAD
    },
    pythagoreanFactor: Math.sqrt(2) / 2,
}

const CAMERA = {
    center: {
        x: WINDOW.w / 2,
        y: WINDOW.h / 2,
    },
    period: 10
}

const WEAPON = {
    w: 80,
    h: 120,
    minDistance: 40

};

const BULLET = {
    w: 5,
    h: 70,
    radius: 5,
    speed: 20,
    pythagoreanFactor: Math.sqrt(2)/2,
    color: "yellow",
};


const KEYBOARD_E = 'KeyE';

const WEAPON_STATE = {
    onTheGround: 0, 
    inTheHand: 1,
}

export {WINDOW, CELL, WALL, PLAYER, BULLET, WEAPON, CAMERA, KEYBOARD_E, WEAPON_STATE, RAD, FPS, DURATION}
