// import { wallList, weaponSet, groundList, aidKitSet, ammunitionSet, spawnPoints } from "../data.js";
import { wallList, weaponSet, groundList, aidKitSet, ammunitionSet, spawnPoints } from "../MAPS/DeathMatch/map1.js";
import {RAD, SOUND, FPS, RPS, FRAME_DURATION, REQUEST_DURATION, WINDOW, LEADER_BOARD, INTERFACE, SHAKE, CAMERA, KEYBOARD_E, KEYBOARD_F} from "../CONST/GAME/GAME.js";
import { ENTITY, HEALTH_BAR, ENEMY } from "../CONST/GAME/ENTITY/ENTITY.js";
import { SKINS } from "../CONST/GAME/ENTITY/SKINS.js";
import { BOT_SKINS } from "../CONST/GAME/ENTITY/BOT.js";
import { AMMUNITION } from "../CONST/GAME/FIELD/AMMUNITION.js";
import { AIDKIT } from "../CONST/GAME/FIELD/AIDKIT.js"; 
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
            "map": {
                cells: groundList,
                walls: wallList,
                weapons: weaponSet,
                aidKits: aidKitSet,
                ammunitions: ammunitionSet,
                spawnPoints: spawnPoints,
            },
            "player": {
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
                aidKit: AIDKIT,
                cellView: CELL,
                wallView: WALL,
                bulletView: BULLET,
                bulletAmount: DRAW_BULLETS_AMOUNT,
                weaponModels: WEAPON_MODELS,
                weaponProperties: WEAPON,
                weaponStatus: WEAPON_STATE,
                meleeStrike: MELEE_STRIKE,
                sound: SOUND,
            }
        }
    }
}

const GAME_MODE = {
    BR: 0,
    DM: 1,
    SR: 2
}

export {Map}