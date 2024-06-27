import { PLAYER_SET, WEAPON_STATE } from "../settings.js";
import { Weapon } from "../Weapon/Weapon.js";
import { PlayerModel } from "./PlayerModel.js";
import { PlayerView } from "./PlayerView.js";

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

}

export { PlayerController };
