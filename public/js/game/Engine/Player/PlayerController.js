import { BONUS, ENTITY, WEAPON, WEAPON_STATE } from "../../CONST.js";
import { Bullet } from "../Weapon/Bullet.js";
import { PlayerModel } from "./PlayerModel.js";
import { EntityController } from "../Entity/EntityController.js";

class PlayerController extends EntityController {
    constructor(player) {
        super();    
        this.model = new PlayerModel(player);
        

        addEventListener("mousemove", (event) => this.mouseMove(event));
        addEventListener("mousedown", (event) => this.mouseDown(event));
        addEventListener("mouseleave", (event) => this.mouseUp(event));
        addEventListener("mouseup", (event) => this.mouseUp(event));
        addEventListener("keydown", (event) => this.keyDown(event));
        addEventListener("keyup", (event) => this.keyUp(event));
    }

    mouseMove(event) {
        if (this.getStacked())
            return
        const { x, y } = this.getPosition();
        const v1 = { x: 1, y: 0 };
        const v2 = { x: event.x - x, y: event.y - y };
        const difference = { x: v2.x - v1.x, y: v2.y - v1.y };
        const angle = Math.atan2(difference.x, -difference.y) - Math.PI / 2;
        this.setAngle(angle);
    }

    mouseDown(event) {
        if ((this.getWeapon()) && (this.getWeapon().getBattleType() === "distant")) {
            if (!this.getWeapon().getShootingInterval()) {
                this.shot();
                this.getWeapon().setShootingInterval(setInterval(() => this.shot(), this.getWeapon().getRapidity()));
            }
        }
        if ((this.getWeapon()) && (this.getWeapon().getBattleType() === "close")) {
            this.strike();
        }
    }

    pickupBonus(bonus) {
        const { x, y } = this.getPosition();
        const distance = Math.sqrt((bonus.x - x) ** 2 + (bonus.y - y) ** 2);

        if (distance <= BONUS.minDistance) {
            const currentHealth = this.getHealth();
            const maxHealth = this.getMaxHealth();

            if (currentHealth < maxHealth) {
                const healthToAdd = Math.min(bonus.amount, maxHealth - currentHealth);
                this.setHealth(currentHealth + healthToAdd);
                return false;
            }
        }
        return true;
    }

    shot() {
        if (this.getWeapon().getAmount() > 0) {
            this.getWeapon().decAmount();
            for (let i = 0; i < this.getWeapon().getGrouping(); i++) {
                const angle = this.getAngle();
                const x = this.getPosition().x + WEAPON.h * Math.cos(angle);
                const y = this.getPosition().y + WEAPON.h * Math.sin(angle);
                const deviation = this.getWeapon().getDeviation();
                const rapidity = this.getWeapon().getRapidity();
                this.model.bullets.push(new Bullet({ x, y, angle, rapidity, deviation }));
            }
        }
    }

    mouseUp(event) {
        if (this.getWeapon() && (this.getWeapon().getBattleType() === "distant")) {
            clearInterval(this.getWeapon().getShootingInterval());
            this.getWeapon().setShootingInterval(null);
        }
        if (this.getWeapon() && (this.getWeapon().getBattleType() === "close")) {
            if (this.getStacked() === true) {
                this.setStacked(false)
                this.removeTrajectory();
            }
            this.setIsStriking(false);
        }
    }

    strike() {
        if (this.getIsStriking() || (!this.getIsStriking() && this.getTrajectory()) || this.getStacked() === true) return;

        this.setIsStriking(true);

        this.createTrajectory();
        this.getTrajectory().toLeft();
    }

    dropWeapon() {
        this.getWeapon().unsetPlayer(this.model);
        this.getWeapon().setStatus(WEAPON_STATE.onTheGround);
        clearInterval(this.getWeapon().getShootingInterval());
        this.getWeapon().setShootingInterval(null);
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
        // if (this.getWeapon() && (keys.r) && (!this.getWeapon().isRecharging())) {
        //     this.getWeapon().setRecharging(true);
        //     setTimeout(() => this.getWeapon().recharge(), this.getWeapon().getRechargeTime());
        // }
    }

    updateSpeed() {
        const keys = this.model.getKeyPressed();
        let speedX = 0;
        let speedY = 0;

        if (keys.w) speedY = -ENTITY.speed;
        if (keys.a) speedX = -ENTITY.speed;
        if (keys.s) speedY = ENTITY.speed;
        if (keys.d) speedX = ENTITY.speed;

        if ((keys.w && keys.d) || (keys.d && keys.s) || (keys.s && keys.a) || (keys.w && keys.a)) {
            speedX *= ENTITY.pythagoreanFactor;
            speedY *= ENTITY.pythagoreanFactor;
        }

        this.model.setSpeed('x', speedX);
        this.model.setSpeed('y', speedY);
    }

    check(obj) {
        this.model.checkX(obj);
        this.model.checkY(obj);
    }

    update() {
        if (this.getStacked()) return
        this.model.updatePosition();

        if (this.getTrajectory()) {
            if (this.getTrajectory().isAnimating) {
                this.getTrajectory().update(this.getPosition(), this.getAngle(), this.getIsStriking());
            } else {
                this.removeTrajectory();
            }
        }
    }

    getPosition() {
        return { x: this.model.x, y: this.model.y };
    }

    getHealth() {
        return this.model.health;
    }

    getMaxHealth() {
        return this.model.maxHealth;
    }

    setHealth(value) {
        this.model.health = value;
    }

    getBullets() {
        return this.model.bullets;
    }

    setBullets(bullets) {
        this.model.bullets = bullets;
    }

    setAnimating(value) {
        this.model.trajectory.isAnimating = value;
    }

    getAnimating() {
        return this.model.trajectory.isAnimating;
    }

    move(dx, dy) {
        this.model.move(dx, dy);
        if (this.getTrajectory()){
            this.getTrajectory().move(dx, dy);
        }
    }

    setIsStriking(value) {
        this.model.isStriking = value;
    }

    getIsStriking() {
        return this.model.isStriking;
    }

    setStacked(value) {
        this.model.stacked = value;
    }

    getStacked() {
        return this.model.stacked;
    }
}

export { PlayerController };
