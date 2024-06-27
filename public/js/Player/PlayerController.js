import { PLAYER_SET } from "../settings.js";
import { Weapon, state } from "../Weapon/Weapon.js";
import { field } from "../main.js";

class PlayerController {
    constructor(playerModel, playerView) {
        this.playerModel = playerModel;
        this.playerView = playerView;

        addEventListener("mousemove", (event) => this.mouseMove(event));
        addEventListener("keydown", (event) => this.keyDown(event));
        addEventListener("keyup", (event) => this.keyUp(event));
    }

    mouseMove(event) {
        const { x, y } = this.playerModel.getPosition();
        const v1 = { x: 1, y: 0 };
        const v2 = { x: event.x - x, y: event.y - y };
        const difference = { x: v2.x - v1.x, y: v2.y - v1.y };
        const alpha = Math.atan2(difference.x, -difference.y) - Math.PI / 2;
        this.playerModel.setAlpha(alpha);
    }

    keyDown(event) {
        if (event.code == 'KeyE' ) {
            this.distanceCheck();
        }
        this.updateKey(event.code, 1);
    }

    keyUp(event) {
        this.updateKey(event.code, 0);
    }

    updateKey(code, state) {
        const keyMap = {
            'KeyW': 'w',
            'KeyA': 'a',
            'KeyS': 's',
            'KeyD': 'd',
            'KeyE': 'e',
        };
        const key = keyMap[code];
        if (key) {
            this.playerModel.setKeyPressed(key, state);
            this.updateSpeed();
        }
    }

    updateSpeed() {
        const keys = this.playerModel.getKeyPressed();
        let speedX = 0;
        let speedY = 0;

        if (keys.w) speedY = -PLAYER_SET.speed;
        if (keys.a) speedX = -PLAYER_SET.speed;
        if (keys.s) speedY = PLAYER_SET.speed;
        if (keys.d) speedX = PLAYER_SET.speed;

        if ((keys.w && keys.d) || (keys.d && keys.s) || (keys.s && keys.a) || (keys.w && keys.a)) {
            speedX *= PLAYER_SET.pythagoreanFactor;
            speedY *= PLAYER_SET.pythagoreanFactor;
        }

        this.playerModel.setSpeed('x', speedX);
        this.playerModel.setSpeed('y', speedY);
    }

    update() {
        this.playerModel.updatePosition();
        this.playerView.draw(this.playerModel);
    }

    checkIntersections(drawableArray) {
        for (const drawableObj of drawableArray) {
            if (this.playerModel.isIntersect(drawableObj)) {
                this.playerModel.blockDirection();
                return true;
            }
        }
        return false;
    }

    distanceCheck(){
        const { x, y } = this.playerModel.getPosition();
            field.weapons.map(
                weap => {
                    const distance = ((weap.x - x)**2 + (weap.y - y)**2)**0.5;
                    if (distance <= 40){
                        weap.status = state.inTheHand;
                        this.playerModel.setWeapon(weap);
                        weap.player = this.playerModel;
                        weap.x = x+10;
                        weap.y = y+10;
                        console.log(this.playerModel, weap);
                    }
                }
            )
    }
}

export { PlayerController };
