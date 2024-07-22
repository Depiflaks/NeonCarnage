const WEAPON = {
    w: 80,
    h: 120,
    minDistance: 80

};

const WEAPON_STATE = {
    onTheGround: 0,
    inTheHand: 1,
};

const MELEE_STRIKE = {
    name: 'knife',
    handPoint: 40,
    width: 150,
    height: 10,
    deltaAngle: Math.PI / 3,
    animationSpeed: 0.07,
    knifeLeftImage: "public/assets/Weapon/left.png",
    knifeRightImage: "public/assets/Weapon/right.png",
    knifeLeftBloodyImage: "public/assets/Weapon/leftBloody.png",
    knifeRightBloodyImage: "public/assets/Weapon/rightBloody.png",

};

export {WEAPON, WEAPON_STATE, MELEE_STRIKE};