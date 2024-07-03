import { PLAYER_SET, WEAPON_STATE } from "../settings.js";
import { Weapon } from "../Weapon/Weapon.js";
import { Bullet } from "../Weapon/Bullet.js";
import { PlayerModel } from "./PlayerModel.js";
import { PlayerView } from "./PlayerView.js";
import { Trajectory } from "../Weapon/Trajectory.js";

class PlayerController {
    constructor(context, player) {
        this.model = new PlayerModel(player);
        this.view = new PlayerView(context);

        addEventListener("mousemove", (event) => this.mouseMove(event));
        addEventListener("mousedown", (event) => this.mouseDown(event));
        addEventListener("mouseleave", (event) => this.mouseUp(event));
        addEventListener("mouseup", (event) => this.mouseUp(event));
        addEventListener("keydown", (event) => this.keyDown(event));
        addEventListener("keyup", (event) => this.keyUp(event));
    }

    mouseMove(event) {
        const { x, y } = this.model.getPosition();
        const v1 = { x: 1, y: 0 };
        const v2 = { x: event.x - x, y: event.y - y };
        const difference = { x: v2.x - v1.x, y: v2.y - v1.y };
        const angle = Math.atan2(difference.x, -difference.y) - Math.PI / 2;
        this.model.setAngle(angle);
    }

    mouseDown(event) { 
        if ((this.model.weapon != null) && (this.model.weapon.model.battleType == "distant")) {
            if (!this.model.weapon.model.shootingInterval) {
                this.shot();  
                this.model.weapon.model.shootingInterval = setInterval(() => this.shot(), this.model.weapon.model.rapidity);
            }
        }
        if((this.model.weapon != null) && (this.model.weapon.model.battleType === "close")) {
            this.strike();
        }
    }

    shot() {
        if(this.model.weapon.model.amount > 0) {
            this.model.weapon.model.amount -= 1;
            for (let i = 0; i < this.model.weapon.model.grouping; i++) {
                const x = this.model.getPosition().x;
                const y = this.model.getPosition().y;
                const angle = this.model.getAngle();
                const deviation = this.model.weapon.model.deviation;
                const rapidity = this.model.weapon.model.rapidity;
                this.model.bullets.push(new Bullet({x, y, angle, rapidity, deviation}));
            }
        }
    }

    mouseUp(event)
    {
        if((this.model.weapon != null) && (this.model.weapon.model.battleType == "distant"))
        {
            clearInterval(this.model.weapon.model.shootingInterval);
            this.model.weapon.model.shootingInterval = null;
        }
    }

    strike() {
        if (this.isStriking) return;
        this.isStriking = true;

        const weapon = this.model.weapon.model;

        if (weapon.status === WEAPON_STATE.inTheHand) {
            const { x, y } = this.model.getPosition();
            const angle = this.model.getAngle();
            const trajectory = new Trajectory({
                x: x,
                y: y,
                angle: angle
            }, this.view.context);

            trajectory.animateStrike(this.model, this.isLeftToRight, () => {
                this.isStriking = false;
                this.isLeftToRight = !this.isLeftToRight;
            });
        }
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
            'KeyR': 'r',
        };
        const key = keyMap[code];
        if (key) {
            this.model.setKeyPressed(key, state);
            this.updateSpeed();
            this.updateBulletAmount();
        }
    }

    updateBulletAmount() {
        const keys = this.model.getKeyPressed();
        if ((keys.r) && (!this.model.weapon.model.isRecharging)) {
            this.model.weapon.model.isRecharging = true;
            setTimeout(() => this.model.weapon.recharge(), this.model.weapon.model.rechargeTime);
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

    update() {
        this.model.updatePosition();
    }

<<<<<<< Updated upstream:public/js/Player/PlayerController.js
    checkIntersections(drawableArray) {
        for (const drawableObj of drawableArray) {
            this.model.updatePosition()
            if (this.model.isIntersect(drawableObj)) {
                while(this.model.isIntersect(drawableObj))
                {
                    this.model.stepBack();
                }
                return true;
            }
            else {
                this.model.stepBack();
            }
        }
        return false;
=======
    setAngle(value) {
        this.model.angle = value;
    }

    getAngle() {
        return this.model.angle;
    }

    getPosition() {
        return { x: this.model.x, y: this.model.y };
    }

    getSpeed() {
        return this.model.getSpeed();
    }

    setSpeed(direction, value) {
        this.model.setSpeed();
    }

    getBullets() {
        return this.model.bullets;
    }

    setBullets(bullets) {
        this.model.bullets = bullets;
    }

    getWeapon() {
        return this.model.weapon; 
>>>>>>> Stashed changes:Player/PlayerController.js
    }
    
    updatePosition() {
        this.model.updatePosition();
    }
}

export { PlayerController };
