import { wallList, weaponSet, groundList, bonusSet, ammunitionSet } from "../data.js";
import {RAD, FPS, RPS, FRAME_DURATION, REQUEST_DURATION, WINDOW, LEADER_BOARD, INTERFACE, SHAKE, CAMERA, KEYBOARD_E, KEYBOARD_F} from "../CONST/GAME/GAME.js";
import { ENTITY, HEALTH_BAR, ENEMY } from "../CONST/GAME/ENTITY/ENTITY.js";
import { SKINS } from "../CONST/GAME/ENTITY/SKINS.js";
import { BOT_SKINS } from "../CONST/GAME/ENTITY/BOT.js";
import { AMMUNITION } from "../CONST/GAME/FIELD/AMMUNITION.js";
import { BONUS } from "../CONST/GAME/FIELD/BONUS.js"; 
import { CELL, WALL } from "../CONST/GAME/FIELD/FIELD.js";
import { BULLET, DRAW_BULLETS_AMOUNT } from "../CONST/GAME/WEAPON/BULLET.js";
import { WEAPON_MODELS } from "../CONST/GAME/WEAPON/WEAPON_MODELS.js";
import { MELEE_STRIKE, WEAPON, WEAPON_STATE } from "../CONST/GAME/WEAPON/WEAPON.js";
import { SERVER } from "../CONST/SERVER/SERVER.js";

class Map {
    constructor() {

    }

    create() {
        return {
            "player": {
                skinId: 5,
                spawnPoints: [
                    {
                        x: 447,
                        y: 267,
                    },

                    // {
                    //     x: 1366,
                    //     y: 291,
                    // },
                    // {
                    //     x: 2236,
                    //     y: 149,
                    // },

                    // {
                    //     x: 2849,
                    //     y: 588,
                    // },

                    // {
                    //     x: 3761,
                    //     y: 1196,
                    // },

                    // {
                    //     x: 3604,
                    //     y: 2544,
                    // },

                    // {
                    //     x: 2861,
                    //     y: 2242,
                    // },

                    // {
                    //     x: 1667,
                    //     y: 3149,
                    // },

                    // {
                    //     x: 608,
                    //     y: 3146,
                    // },

                    // {
                    //     x: 146,
                    //     y: 2110,
                    // },
                ]
            },
            "obj": {
                cells: groundList,
                walls: wallList,
                weapons: weaponSet,
                bonuses: bonusSet,
                ammunitions: ammunitionSet,
            },
            "const": {
                rad: RAD,
                fps: FPS,
                rps: RPS,
                frameDuration: FRAME_DURATION,
                requestDuration: REQUEST_DURATION,
                servers: SERVER,
                window: WINDOW,
                leaderBoard: LEADER_BOARD,
                interface: INTERFACE,
                windowShake: SHAKE,
                camera: CAMERA,
                keyE: KEYBOARD_E,
                keyF: KEYBOARD_F,
                entityView: ENTITY,
                healthBar: HEALTH_BAR,
                enemy: ENEMY,
                playerSkins: SKINS,
                botSkins: BOT_SKINS,
                ammunition: AMMUNITION,
                aidKit: BONUS,
                cellView: CELL,
                wallView: WALL,
                bulletView: BULLET,
                bulletAmount: DRAW_BULLETS_AMOUNT,
                weaponModels: WEAPON_MODELS,
                weaponProperties: WEAPON,
                weaponStatus: WEAPON_STATE,
                meleeStrike: MELEE_STRIKE,
            }
        }
    }
}

export {Map}