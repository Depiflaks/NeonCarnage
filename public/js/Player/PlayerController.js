import { PLAYER, WEAPON_STATE } from "../CONST.js";
import { Bullet } from "../Weapon/Bullet.js";
import { PlayerModel } from "./PlayerModel.js";
import { PlayerView } from "./PlayerView.js";
import { Trajectory } from "../Weapon/Trajectory.js";

class PlayerController {
    constructor(context, player) {
        this.model = new PlayerModel(player);
        this.view = new PlayerView(context);

        this.isStriking = false;

        addEventListener("mousemove", (event) => this.mouseMove(event));
        addEventListener("mousedown", (event) => this.mouseDown(event));
        addEventListener("mouseleave", (event) => this.mouseUp(event));
        addEventListener("mouseup", (event) => this.mouseUp(event));
        addEventListener("keydown", (event) => this.keyDown(event));
        addEventListener("keyup", (event) => this.keyUp(event));
    }

    mouseMove(event) {
        const { x, y } = this.getPosition();
        const v1 = { x: 1, y: 0 };
        const v2 = { x: event.x - x, y: event.y - y };
        const difference = { x: v2.x - v1.x, y: v2.y - v1.y };
        const angle = Math.atan2(difference.x, -difference.y) - Math.PI / 2;
        this.setAngle(angle);
    }

    mouseDown(event) { 
        if ((this.getWeapon()) && (this.getWeapon().model.battleType === "distant")) {
            if (!this.getWeapon().model.shootingInterval) {
                this.shot();  
                this.getWeapon().model.shootingInterval = setInterval(() => this.shot(), this.getWeapon().model.rapidity);
            }
        }
        if((this.getWeapon()) && (this.getWeapon().model.battleType === "close")) {
            this.strike();
        }
    }

    shot() {
        if(this.getWeapon().model.amount > 0) {
            this.getWeapon().model.amount -= 1;
            for (let i = 0; i < this.getWeapon().model.grouping; i++) {
                const x = this.getPosition().x;
                const y = this.getPosition().y;
                const angle = this.getAngle();
                const deviation = this.getWeapon().model.deviation;
                const rapidity = this.getWeapon().model.rapidity;
                this.model.bullets.push(new Bullet({x, y, angle, rapidity, deviation}));
            }
        }
    }

    mouseUp(event)
    {
        if (this.getWeapon() && (this.getWeapon().model.battleType === "distant"))
        {
            clearInterval(this.getWeapon().model.shootingInterval);
            this.getWeapon().model.shootingInterval = null;
        }
        if (this.getWeapon() && (this.getWeapon().model.battleType === "close"))
        {
            this.isStriking = false;
        }
    }

    strike() {
        if (this.isStriking || (!this.isStriking && this.getTrajectory())) return;

        this.isStriking = true;

        this.model.createTrajectory();
        this.getTrajectory().toLeft();
    }

    dropWeapon() {
        this.getWeapon().unsetPlayer(this.model);
        this.getWeapon().model.status = WEAPON_STATE.onTheGround;
        this.setWeapon(null);
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
        if (this.getWeapon() && (keys.r) && (!this.getWeapon().model.isRecharging)) {
            this.getWeapon().model.isRecharging = true;
            setTimeout(() => this.getWeapon().recharge(), this.getWeapon().model.rechargeTime);
        }
    }

    updateSpeed() {
        const keys = this.model.getKeyPressed();
        let speedX = 0;
        let speedY = 0;

        if (keys.w) speedY = -PLAYER.speed;
        if (keys.a) speedX = -PLAYER.speed;
        if (keys.s) speedY = PLAYER.speed;
        if (keys.d) speedX = PLAYER.speed;

        if ((keys.w && keys.d) || (keys.d && keys.s) || (keys.s && keys.a) || (keys.w && keys.a)) {
            speedX *= PLAYER.pythagoreanFactor;
            speedY *= PLAYER.pythagoreanFactor;
        }

        this.model.setSpeed('x', speedX);
        this.model.setSpeed('y', speedY);
    }

    check(obj) {
        this.model.checkX(obj);
        this.model.checkY(obj);
    }
    
    update() {
        this.model.updatePosition();

        if (this.getTrajectory()) {
            if (this.getTrajectory().isAnimating) {
                this.getTrajectory().update(this.getPosition(), this.getAngle(), this.isStriking);
            } else {
                this.model.removeTrajectory();
            }
        }

    }

    setAngle(value) {
        this.model.angle = value;
    }

    getAngle() {
        return this.model.angle;
    }

    getPosition() {
        return { x: this.model.x, y: this.model.y };
    }

    getBullets() {
        return this.model.bullets;
    }

    setBullets(bullets) {
        this.model.bullets = bullets;
    }

    getWeapon() {
        return this.model.weapon; 
    }
    
    setWeapon(weapon) {
        this.model.weapon = weapon; 
    }

    getTrajectory() {
        return this.model.trajectory;
    }
    move(dx, dy) {
        this.model.move(dx, dy);
    }
}

export { PlayerController };
