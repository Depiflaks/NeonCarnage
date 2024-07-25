import { map1 } from "../MAPS/BattleRoyale/map1.js";
import { map2 } from "../MAPS/BattleRoyale/map2.js";
import { map3 } from "../MAPS/BattleRoyale/map3.js";
import { map4 } from "../MAPS/DeathMatch/map4.js";
import { map5 } from "../MAPS/DeathMatch/map5.js";
import { map6 } from "../MAPS/DeathMatch/map6.js";
import { map7 } from "../MAPS/OperationOverrun/map7.js";
import { map8 } from "../MAPS/OperationOverrun/map8.js";
import { map9 } from "../MAPS/OperationOverrun/map9.js";
import {RAD, FPS, RPS, FRAME_DURATION, REQUEST_DURATION, WINDOW, LEADER_BOARD, INTERFACE, SHAKE, CAMERA, KEYBOARD_E, KEYBOARD_F, GAME_MODE} from "../CONST/GAME/GAME.js";
import { ENTITY, HEALTH_BAR, ENEMY } from "../CONST/GAME/ENTITY/ENTITY.js";
import { SOUND } from "../CONST/GAME/SOUND.js";
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

    createMap(gameMode, mapNumber) {
        return {
            "map": this.getMap(gameMode, mapNumber),
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
                gameMode: GAME_MODE,
            }
        }
    }

    getMap(gameMode, mapNumber) {
        switch (gameMode) {
            case GAME_MODE.battleRoyale.name:
                switch (mapNumber) {
                    case 1:
                        return this.getObjects(map1);
                    case 2:
                        return this.getObjects(map2);
                    case 3:
                        return this.getObjects(map3);
                };
                break;
            case GAME_MODE.deathMatch.name:
                switch (mapNumber) {
                    case 1:
                        return this.getObjects(map4);
                    case 2:
                        return this.getObjects(map5);
                    case 3:
                        return this.getObjects(map6);
                };
                break;
            case GAME_MODE.operationOverrun.name:
                switch (mapNumber) {
                    case 1:
                        return this.getObjects(map7);
                    case 2:
                        return this.getObjects(map8);
                    case 3:
                        return this.getObjects(map9);
                };
                break;
        }
    }

    getObjects(map) {
        return {
            cells: map.groundList, 
            walls: map.wallList, 
            weapons: map.weaponSet, 
            aidKits: map.aidKitSet,
            ammunitions: map.ammunitionSet,
            spawnPoints: map.spawnPoints,
            area: map.area,
            bots: map.bots,
        }
    }
    
}

export {Map}