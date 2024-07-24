
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
    deathMatch: {
        name: "Death Match",
        respawn: {
            aidKid: true,
            ammunition: true,
            player: true,
        },
        timer: true,
        seconds: 180,
        area: false,
        bots: false,
        endPoint: false,
    },
    battleRoyale: {
        name: "Battle Royale",
        respawn: {
            aidKid: false,
            ammunition: false,
            player: false
        },
        timer: false,
        area: true,
        bots: true,
        endPoint: false,
    },
    operationOverrun: {
        name: "Operation Overrun",
        respawn: {
            aidKid: false,
            ammunition: false,
            player: false
        },
        timer: false,
        area: false,
        bots: true,
        endPoint: true,
    }
}

export const KEYBOARD_F = 'KeyF';