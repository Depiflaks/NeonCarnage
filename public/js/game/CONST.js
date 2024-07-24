const data = JSON.parse(localStorage.getItem("responseData")).const;

console.log(data);

export const RAD = data.rad;
export const FPS = data.fps;
export const RPS = data.rps;
export const FRAME_DURATION = data.frameDuration;
export const REQUEST_DURATION = data.requestDuration;

export const SERVER = data.servers;
export const WINDOW = data.window;
export const LEADER_BOARD = data.leaderBoard;
export const INTERFACE = data.interface;
export const SHAKE = data.windowShake;
export const CAMERA = data.camera;
export const KEYBOARD_E = data.keyE;
export const KEYBOARD_F = data.keyF; 

export const CELL = data.cellView;
export const WALL = data.wallView;

export const SKINS = data.playerSkins;
export const BOT_SKINS = data.botSkins;
export const ENTITY = data.entityView;
export const ENEMY = data.enemy;

export const WEAPON = data.weaponProperties;
export const WEAPON_MODELS = data.weaponModels;
export const WEAPON_STATE = data.weaponStatus;

export const HEALTH_BAR = data.healthBar;
export const AMMUNITION = data.ammunition;
export const AIDKIT = data.aidKit;

export const SOUND = data.sound;

export const BULLET = data.bulletView;
export const DRAW_BULLETS_AMOUNT = data.bulletAmount;

export const MELEE_STRIKE = data.meleeStrike;
