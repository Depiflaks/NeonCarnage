export const RAD = Math.PI / 180;
export const FPS = 90;
export const RPS = 40;
export const FRAME_DURATION = 1000 / FPS;
export const REQUEST_DURATION = 1000 / RPS;

export const WINDOW = {
    w: 1920,
    h: 1080,
    c: "black",
};

export const LEADER_BOARD = {
    w: 600,
    h: 200,
    amount: 1200,
};

export const INTERFACE = {
    cursor: "public/assets/Interface/cursor.png",
    pointer: "public/assets/Interface/newPointer.png",
    w: 100,
    h: 80
}

export const SHAKE = {
    duration: 2,
    scale: 10,
    relocateRange: 5, // scale / 2
}

export const CAMERA = {
    center: {
        x: WINDOW.w / 2,
        y: WINDOW.h / 2,
    },
    period: 10,
};

export const KEYBOARD_E = 'KeyE';

export const GAME_MODE = {
    deathMatch: "Death Match",
    battleRoyale: "Battle Royale",
    operationOverrun: "Operation Overrun"
}

export const KEYBOARD_F = 'KeyF';