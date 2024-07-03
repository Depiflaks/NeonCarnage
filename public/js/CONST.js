const RAD = Math.PI / 180;
const FPS = 90;
const DURATION = 1000 / FPS;

const SERVER = {
    sergey: 'ws://10.250.104.142:8000/',
    ignat: 'ws://10.250.104.176:8000',
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
    inactiveAlpha: 0.4,
    deltaAlpha: 0.01,
    color: "green",
};


const WALL = {
    h: 15,
    color: "orange",
}

const PLAYER = {
    radius: 20,
    w: 60,
    h: 30,
    headColor: "red",
    bodyColor: "blue",
    speed: 8,
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
    w: 20,
    h: 30,
    color: "pink",
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

export {WINDOW, CELL, WALL, PLAYER, BULLET, WEAPON, CAMERA, KEYBOARD_E, WEAPON_STATE, RAD, FPS, DURATION, SERVER}
