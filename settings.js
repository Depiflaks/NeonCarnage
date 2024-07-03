<<<<<<< Updated upstream:public/js/settings.js
const RAD = Math.PI / 180;

const WINDOW = {
<<<<<<<< Updated upstream:settings.js
    w: 1400,
    h: 1000,
========
    w: 1200,
    h: 900,
>>>>>>>> Stashed changes:CONST.js
=======


const WINDOW = {
    w: 1400,
    h: 1000,
>>>>>>> Stashed changes:settings.js
    c: "black",
};

const CELL_SET = {
    w: 150,
    h: 150,
<<<<<<< Updated upstream:public/js/settings.js
    activeColor: "green",
    inactiveColor: "darkgreen",
};

const WALL_SET = {
    h: 15,
    activeColor: "orange",
    inactiveColor: "brown",
=======
    c: "green",
};

const WALL_SET = {
    h: 20,
    c: "orange",
>>>>>>> Stashed changes:settings.js
}

const PLAYER_SET = {
    radius: 20,
    w: 60,
    h: 30,
    headColor: "red",
    bodyColor: "blue",
<<<<<<< Updated upstream:public/js/settings.js
    speed: 10,
    visualField: {
        range: 600,
        angleStep: 15 * RAD
    },
    pythagoreanFactor: Math.sqrt(2) / 2,
=======
    speed: 6,
    pythagoreanFactor: Math.sqrt(2)/2,
>>>>>>> Stashed changes:settings.js
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
<<<<<<< Updated upstream:public/js/settings.js
    w: 5,
    h: 70,
    radius: 5,
    speed: 20,
    pythagoreanFactor: Math.sqrt(2)/2,
    color: "yellow",
=======
    w: 20,
    h: 40,
    radius: 5,
    speed: 20,
    pythagoreanFactor: Math.sqrt(2)/2,
    color: "orange",
>>>>>>> Stashed changes:settings.js
};

const KEYBOARD_E = 'KeyE';
const MIN_DISTANCE = 40;

const WEAPON_STATE = {
    onTheGround: 0, 
    inTheHand: 1,
}

<<<<<<< Updated upstream:public/js/settings.js
export {WINDOW, CELL_SET, WALL_SET, PLAYER_SET, BULLET_SET, WEAPON_SET, CAMERA, KEYBOARD_E, MIN_DISTANCE, WEAPON_STATE, RAD}
=======
export {WINDOW, CELL_SET, WALL_SET, PLAYER_SET, BULLET_SET, WEAPON_SET, CAMERA, KEYBOARD_E, MIN_DISTANCE, WEAPON_STATE}
>>>>>>> Stashed changes:settings.js
