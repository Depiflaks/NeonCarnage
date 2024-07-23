const data = JSON.parse(localStorage.getItem("responseData")).const;

const RAD = data.rad;
const FPS = data.fps;
const RPS = data.rps;
const FRAME_DURATION = data.frameDuration;
const REQUEST_DURATION = data.requestDuration;

const SERVER = data.servers;
const WINDOW = data.window;
const LEADER_BOARD = data.leaderBoard;
const INTERFACE = data.interface;
const SHAKE = data.windowShake;
const CAMERA = data.camera;
const KEYBOARD_E = data.keyE;
const KEYBOARD_F = data.keyF; 

const CELL = data.cellView;
const WALL = data.wallView;

const SKINS = data.playerSkins;
const BOT_SKINS = data.botSkins;
const ENTITY = data.entityView;
const ENEMY = data.enemy;

const WEAPON = data.weaponProperties;
const WEAPON_MODELS = data.weaponModels;
const WEAPON_STATE = data.weaponStatus;

const HEALTH_BAR = data.healthBar;
const AMMUNITION = data.ammunition;
const AIDKIT = data.aidKit;

const SOUND = data.sound;

const BULLET = data.bulletView;
const DRAW_BULLETS_AMOUNT = data.bulletAmount;

const MELEE_STRIKE = data.meleeStrike;

export {RPS, SOUND, REQUEST_DURATION, FRAME_DURATION, WINDOW, LEADER_BOARD, HEALTH_BAR, SKINS, BOT_SKINS, DRAW_BULLETS_AMOUNT, AMMUNITION, CELL, WALL, INTERFACE, ENTITY, SHAKE, AIDKIT, BULLET, WEAPON, WEAPON_MODELS, CAMERA, KEYBOARD_E, KEYBOARD_F, WEAPON_STATE, RAD, FPS, MELEE_STRIKE, SERVER, ENEMY};
