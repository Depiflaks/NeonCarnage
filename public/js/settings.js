const window = {
    w: 1400,
    h: 1000,
    c: "black",
};

const cellSet = {
    w: 150,
    h: 150,
    c: "green",
};

const wallSet = {
    h: 5,
    c: "orange",
}

const playerSet = {
    radius: 20,
    w: 60,
    h: 30,
    headColor: "red",
    bodyColor: "blue",
    speed: 3,
    pythagoreanFactor: Math.sqrt(2)/2,
};

const camera = {
    center: {
        x: window.w / 2,
        y: window.h / 2,
    },
    period: 10
}

const weapon = {
    w: 20,
    h: 30,
    color: "pink",
    statOnGround: 0,
    statInHand: 1, 
};


export {window, cellSet, wallSet, playerSet, weapon, camera}
