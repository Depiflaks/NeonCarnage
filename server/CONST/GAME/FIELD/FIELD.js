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

export {CELL, WALL};