import { RAD } from "../GAME.js";

export const HEALTH_BAR = {
    squareSize: 15,
    squaresPerRow: 5,
    offsetX: 10,
    offsetY: 45,
    gap: 0, // Gap between squares
}

export const ENTITY = {
    radius: 30,
    w: 100,
    h: 40,
    wWithWeapon: 90,
    hWithWeapon: 100,
    speed: 9,
    visualField: {
        range: 600,
        angleStep: 5 * RAD,
    },
    pythagoreanFactor: Math.sqrt(2) / 2,
    health: 4,
    maxHealth: 5,
    rebornDelay: 3000,
};

export const ENEMY = {
    period: 5,
}