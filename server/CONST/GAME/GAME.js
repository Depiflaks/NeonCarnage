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

export const SOUND = [
    {
        name: 'background',
        src: '../../../../public/sound/MOON - Paris.mp3',
    },
    {
        name: 'rifle',
        src: '../../../../public/sound/rifle.mp3',
    },
    {
        name: 'glock',
        src: '../../../../public/sound/laser.mp3',
    },
    {
        name: 'pistol',
        src: '../../../../public/sound/laser.mp3',
    },
    {
        name: 'machineGun',
        src: '../../../../public/sound/machineGun.mp3',
    },
    {
        name: 'knife',
        src: '../../../../public/sound/knife.mp3',
    },
    {
        name: 'knifePickUp',
        src: '../../../../public/sound/knifePickUp.mp3',
    },
    {
        name: 'riflePickUp',
        src: '../../../../public/sound/riflePickUp.mp3',
    },
    {
        name: 'pistolPickUp',
        src: '../../../../public/sound/pistolPickUp.mp3',
    },
    {
        name: 'glockPickUp',
        src: '../../../../public/sound/pistolPickUp.mp3',
    },
    {
        name: 'machineGunPickUp',
        src: '../../../../public/sound/machineGunPickUp.mp3',
    },
    {
        name: 'throwWeapon',
        src: '../../../../public/sound/throwWeapon.mp3',
    },
    {
        name: 'ammunition',
        src: '../../../../public/sound/ammunition.mp3',
    },
    {
        name: 'aidKit',
        src: '../../../../public/sound/aidKit.mp3',
    },
    {
        name: 'death',
        src: '../../../../public/sound/death.mp3',
    },
    {
        name: 'reborn',
        src: '../../../../public/sound/reborn.mp3',
    },
    {
        name: 'walk',
        src: '../../../../public/sound/walk.mp3',
    },
    {
        name: 'empty',
        src: '../../../../public/sound/empty.mp3',
    },
]

export const KEYBOARD_E = 'KeyE';

export const GAME_MODE = {
    deathMatch: "Death Match",
    battleRoyale: "Battle Royale",
    operationOverrun: "Operation Overrun"
}

export const KEYBOARD_F = 'KeyF';