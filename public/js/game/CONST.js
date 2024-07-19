// CONST.js
const RAD = Math.PI / 180;
const FPS = 90;
const RPS = 40;
const FRAME_DURATION = 1000 / FPS;
const REQUEST_DURATION = 1000 / RPS;

const SERVER = {
    sergey: 'ws://10.250.104.142:8000/',
    sergey_home: 'ws://192.168.159.162:8000/',
    ignat: 'ws://192.168.31.172:8000/',
    ignat_home: 'ws://10.250.104.176:8000/',
    liuba: 'ws://10.250.104.51:8000/',
    liuba_home: 'ws://192.168.103.146:8000',
    denis: 'ws://10.250.104.148:8000/',
    denis_home: 'ws://192.168.129.252:8000/'
};

const WINDOW = {
    w: 1920,
    h: 1080,
    c: "black",
};

const LEADER_BOARD = {
    w: 600,
    h: 200,
    amount: 1200,
};

const CELL = {
    w: 150,
    h: 150,
    activeAlpha: 0,
    inactiveAlpha: 0.5,
    deltaAlpha: 0.01,
    src: "public/assets/BattleGround/cell.png",
};

const WALL = {
    h: 15,
    verticalStartImage: "public/assets/BattleGround/verticalWallStart.png",
    verticalEndImage: "public/assets/BattleGround/verticalWallEnd.png",
    verticalBetweenImage: "public/assets/BattleGround/verticalWallBetween.png",
    verticalImage: "public/assets/BattleGround/verticalWall.png",
    horizontalStartImage: "public/assets/BattleGround/horizontalWallStart.png",
    horizontalEndImage: "public/assets/BattleGround/horizontalWallEnd.png",
    horizontalBetweenImage: "public/assets/BattleGround/horizontalWallBetween.png",
    horizontalImage: "public/assets/BattleGround/horizontalWall.png"
}

const SKINS = [
    {   
        head: "public/assets/Player/Skin1/head.png",
        body: "public/assets/Player/Skin1/body.png",
        bodyWithWeapon: "public/assets/Player/Skin1/bodyWithWeapon.png",
        bodyWithPistols: "public/assets/Player/Skin1/bodyWithPistols.png",
        corpse: "public/assets/Player/Skin1/died.png",
    },
    {   
        head: "public/assets/Player/Skin2/head.png",
        body: "public/assets/Player/Skin2/body.png",
        bodyWithWeapon: "public/assets/Player/Skin2/bodyWithWeapon.png",
        bodyWithPistols: "public/assets/Player/Skin2/bodyWithPistols.png",
        corpse: "public/assets/Player/Skin2/died.png"
    },
    {   
        head: "public/assets/Player/Skin3/head.png",
        body: "public/assets/Player/Skin3/body.png",
        bodyWithWeapon: "public/assets/Player/Skin3/bodyWithWeapon.png",
        bodyWithPistols: "public/assets/Player/Skin3/bodyWithPistols.png",
        corpse: "public/assets/Player/Skin3/died.png"
    },
    {   
        head: "public/assets/Player/Skin4/head.png",
        body: "public/assets/Player/Skin4/body.png",
        bodyWithWeapon: "public/assets/Player/Skin4/bodyWithWeapon.png",
        bodyWithPistols: "public/assets/Player/Skin4/bodyWithPistols.png",
        corpse: "public/assets/Player/Skin4/died.png"
    },
    {   
        head: "public/assets/Player/Skin5/head.png",
        body: "public/assets/Player/Skin5/body.png",
        bodyWithWeapon: "public/assets/Player/Skin5/bodyWithWeapon.png",
        bodyWithPistols: "public/assets/Player/Skin5/bodyWithPistols.png",
        corpse: "public/assets/Player/Skin5/died.png"
    },
    {   
        head: "public/assets/Player/Skin6/head.png",
        body: "public/assets/Player/Skin6/body.png",
        bodyWithWeapon: "public/assets/Player/Skin6/bodyWithWeapon.png",
        bodyWithPistols: "public/assets/Player/Skin6/bodyWithPistols.png",
        corpse: "public/assets/Player/Skin6/died.png"
    }
]

const ENTITY = {
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
    health: 10,
    maxHealth: 10,
};

const INTERFACE = {
    cursor: "public/assets/Interface/cursor.png",
}

const SHAKE = {
    duration: 2,
    scale: 10,
    relocateRange: 5, // scale / 2
}

const CAMERA = {
    center: {
        x: WINDOW.w / 2,
        y: WINDOW.h / 2,
    },
    period: 10,
};

const WEAPON = {
    w: 80,
    h: 120,
    minDistance: 80

};

const WEAPON_MODELS = {
    knife: {
        name: "knife",
        battleType: "close",  //ближний или дальний бой
        rapidity: 10,           //скорострельность (задержка в миллисек)
        grouping: 10,           //кучность
        deviation: 0.5,          //отклонение
        onGround: "public/assets/Weapon/weapon5.png",       //текстура на земле
        inHand: "public/assets/Weapon/weaponUp5.png", //текстура в руках
        amount: 0, //количество пуль в магазине(для холодного - 0)
        rechargeTime: 0, //время перезарядки
        w: 20,
        h: 50,
    },
    rifle: {
        name: "rifle",
        battleType: "distant",
        rapidity: 100,
        grouping: 1,
        deviation: 0.1,
        onGround: "public/assets/Weapon/weapon1.png",
        inHand: "public/assets/Weapon/weaponUp1.png",
        amount: 40,
        rechargeTime: 3000,
        w: 25,
        h: 120,
    },
    machineGun: {
        name: "machineGun",
        battleType: "distant",
        rapidity: 500,
        grouping: 5,
        deviation: 0.4,
        onGround: "public/assets/Weapon/weapon2.png",
        inHand: "public/assets/Weapon/weaponUp2.png",
        amount: 20,
        rechargeTime: 3000,
        w: 40,
        h: 130,
    },
    pistol: {
        name: "pistol",
        battleType: "distant",
        rapidity: 300,
        grouping: 1,
        deviation: 0.05,
        onGround: "public/assets/Weapon/weapon3.png",
        inHand: "public/assets/Weapon/weaponUp3.png",
        amount: 15,
        rechargeTime: 1500,
        w: 20,
        h: 70,
    },
    glock: {
        name: "glock",
        battleType: "distant",
        rapidity: 200,
        grouping: 1,
        deviation: 0.05,
        onGround: "public/assets/Weapon/weapon4.png",
        inHand: "public/assets/Weapon/weaponUp4.png",
        amount: 15,
        rechargeTime: 2000,
        w: 20,
        h: 70,
    }
}

const AMMUNITION = {
    w: 50,
    h: 50,
    image: "public/assets/Bonuses/cartridges.png",
    minDistance: 40,
}

const BONUS = {
    w: 50,
    h: 50,
    image: "public/assets/Bonuses/aidKit.png",
    minDistance: 40,
}

const BULLET = {
    w: 5,
    h: 70,
    radius: 70,
    speed: 25,
    pythagoreanFactor: Math.sqrt(2) / 2,
    color: "yellow",
    image: "public/assets/Bonuses/cartridges.png",
};

const ENEMY = {
    period: 5,
}

const KEYBOARD_E = 'KeyE';

const KEYBOARD_TAB = 'KeyF'; 

const WEAPON_STATE = {
    onTheGround: 0,
    inTheHand: 1,
};

const TRAJECTORY = {
    handPoint: 40,
    width: 150,
    height: 10,
    deltaAngle: Math.PI / 3,
    animationSpeed: 0.07,
    knifeLeftImage: "public/assets/Weapon/left.png",
    knifeRightImage: "public/assets/Weapon/right.png",
};

export {RPS, REQUEST_DURATION, FRAME_DURATION, WINDOW, LEADER_BOARD, SKINS, AMMUNITION, CELL, WALL, INTERFACE, ENTITY, SHAKE, BONUS, BULLET, WEAPON, WEAPON_MODELS, CAMERA, KEYBOARD_E, KEYBOARD_TAB, WEAPON_STATE, RAD, FPS, TRAJECTORY, SERVER, ENEMY};
