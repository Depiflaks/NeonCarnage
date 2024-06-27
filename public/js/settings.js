const RAD = Math.PI / 180;

const WINDOW = {
    w: 1400,
    h: 1000,
    c: "black",
};

const CELL_SET = {
    w: 150,
    h: 150,
    activeColor: "green",
    inactiveColor: "darkgreen",
};

const WALL_SET = {
    h: 20,
    activeColor: "orange",
    inactiveColor: "brown",
}

const PLAYER_SET = {
    radius: 20,
    w: 60,
    h: 30,
    headColor: "red",
    bodyColor: "blue",
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

const WEAPON_SET = {
    w: 20,
    h: 30,
    color: "pink",
    statOnGround: 0,
    statInHand: 1, 
};

const KEYBOARD_E = 'KeyE';
const MIN_DISTANCE = 40;

const WEAPON_STATE = {
    onTheGround: 0, 
    inTheHand: 1,
}

export {WINDOW, CELL_SET, WALL_SET, PLAYER_SET, WEAPON_SET, CAMERA, KEYBOARD_E, MIN_DISTANCE, WEAPON_STATE, RAD}
