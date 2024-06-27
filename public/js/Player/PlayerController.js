import { PLAYER_SET } from "../settings.js";
import { Weapon, state } from "../Weapon/Weapon.js";
import { PlayerModel } from "./PlayerModel.js";
import { PlayerView } from "./PlayerView.js";

class PlayerController {
    constructor(context, player) {
        this.model = new PlayerModel(player);
        this.view = new PlayerView(context);

        addEventListener("mousemove", (event) => this.mouseMove(event));
        addEventListener("keydown", (event) => this.keyDown(event));
        addEventListener("keyup", (event) => this.keyUp(event));
    }

    mouseMove(event) {
        const { x, y } = this.model.getPosition();
        const v1 = { x: 1, y: 0 };
        const v2 = { x: event.x - x, y: event.y - y };
        const difference = { x: v2.x - v1.x, y: v2.y - v1.y };
<<<<<<< Updated upstream
        const alpha = Math.atan2(difference.x, -difference.y) - Math.PI / 2;
        this.playerModel.setAlpha(alpha);
=======
        const angle = Math.atan2(difference.x, -difference.y) - Math.PI / 2;
        this.model.setangle(angle);
>>>>>>> Stashed changes
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
            this.model.setKeyPressed(key, state);
            this.updateSpeed();
        }
    }

    updateSpeed() {
        const keys = this.model.getKeyPressed();
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

        this.model.setSpeed('x', speedX);
        this.model.setSpeed('y', speedY);
    }

<<<<<<< Updated upstream
    update() {
        this.model.updatePosition();
    }

    checkIntersections(drawableArray) {
        for (const drawableObj of drawableArray) {
<<<<<<< Updated upstream
            this.playerModel.updatePosition();
            if (this.playerModel.isIntersect(drawableObj)) {
                this.playerModel.stepBack();
                this.playerModel.resetSpeed();
=======
            this.model.updatePosition()
            if (this.model.isIntersect(drawableObj)) {
                while(this.model.isIntersect(drawableObj))
                {
                    this.model.stepBack();
                }
>>>>>>> Stashed changes
                return true;
            }
            else {
                this.model.stepBack();
            }
        }
        return false;
    }
=======
    updatePosition() {
        this.model.updatePosition();
    }

>>>>>>> Stashed changes
}

export { PlayerController };
