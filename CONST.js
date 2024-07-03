const RAD = Math.PI / 180;

const WINDOW = {
<<<<<<<< Updated upstream:settings.js
    w: 1400,
    h: 1000,
========
    w: 1200,
    h: 900,
>>>>>>>> Stashed changes:CONST.js
    c: "black",
};

const CELL_SET = {
    w: 150,
    h: 150,
    activeColor: "green",
    inactiveColor: "darkgreen",
};

const WALL_SET = {
    h: 15,
    activeColor: "orange",
    inactiveColor: "brown",
}

const PLAYER_SET = {
    radius: 20,
    w: 60,
    h: 30,
    headColor: "red",
    bodyColor: "blue",
    speed: 10,
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

const WEAPON_SET = {
    w: 20,
    h: 30,
    color: "pink",
    statOnGround: 0,
    statInHand: 1, 
};

const BULLET_SET = {
    w: 5,
    h: 70,
    radius: 5,
    speed: 20,
    pythagoreanFactor: Math.sqrt(2)/2,
    color: "yellow",
};

const KEYBOARD_E = 'KeyE';
const MIN_DISTANCE = 40;

const WEAPON_STATE = {
    onTheGround: 0, 
    inTheHand: 1,
}

export {WINDOW, CELL_SET, WALL_SET, PLAYER_SET, BULLET_SET, WEAPON_SET, CAMERA, KEYBOARD_E, MIN_DISTANCE, WEAPON_STATE, RAD}
