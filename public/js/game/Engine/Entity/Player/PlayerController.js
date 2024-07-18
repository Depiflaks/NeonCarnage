import {WINDOW, BONUS, ENTITY, WEAPON, WEAPON_STATE, SHAKE} from "../../../CONST.js";
import { Bullet } from "../../Weapon/Bullet/Bullet.js";
import { PlayerModel } from "./PlayerModel.js";
import { EntityController } from "../EntityController.js";

class PlayerController extends EntityController {
    constructor(position, skinId, name) {
        super();
        this.model = new PlayerModel(position, skinId, name);

        this.cursorX = WINDOW.w / 2;
        this.cursorY = WINDOW.h / 2;

        addEventListener("mousemove", (event) => this.mouseMove(event));
        addEventListener("mousedown", (event) => this.mouseDown(event));
        addEventListener("mouseleave", (event) => this.mouseUp(event));
        addEventListener("mouseup", (event) => this.mouseUp(event));
        addEventListener("keydown", (event) => this.keyDown(event));
        addEventListener("keyup", (event) => this.keyUp(event));
    }

    mouseMove(event) {
        this.cursorX = event.clientX;
        this.cursorY = event.clientY;
        const { x, y } = this.getPosition();
        const v1 = { x: 1, y: 0 };
        const v2 = { x: event.x - x, y: event.y - y };
        const difference = { x: v2.x - v1.x, y: v2.y - v1.y };
        const angle = Math.atan2(difference.x, -difference.y) - Math.PI / 2;

        if (this.getStacked())
            return
        this.setAngle(angle);
    }

    mouseDown(event) {
        if (!this.getWeapon()) return;
        if (this.getWeapon().getBattleType() === "distant" && !this.getWeapon().getShootingInterval()) {
            this.shot();
            this.getWeapon().setShootingInterval(setInterval(() => this.shot(), this.getWeapon().getRapidity()));
        }
        if (this.getWeapon().getBattleType() === "close") {
            this.strike();
        }
    }

    pickupBonus(bonus) {
        const { x, y } = this.getPosition();
        const distance = Math.sqrt((bonus.x - x) ** 2 + (bonus.y - y) ** 2);
        const currentHealth = this.getHealth();
        const maxHealth = this.getMaxHealth();
        if (distance <= BONUS.minDistance && currentHealth < maxHealth) {
            this.addHeal(bonus.amount)
            return false;
        }
        return true;
    }

    reborn() {
        this.model.isAlive = true;
        this.setHealth(this.getMaxHealth());
        this.setSpawnPoint();
    }

    shot() {
        if (this.getWeapon().getAmount() <= 0) return;
        this.getWeapon().decAmount();
        for (let i = 0; i < this.getWeapon().getGrouping(); i++) {
            const angle = this.getAngle();
            const x = this.getPosition().x + WEAPON.h/4.1 * Math.cos(angle);
            const y = this.getPosition().y + WEAPON.h/4.1 * Math.sin(angle);
            const deviation = this.getWeapon().getDeviation();
            const angleDeviation = (Math.random() * 2 - 1) * deviation;
            const adjustedAngle = angle + angleDeviation;
            this.model.bullets.push(new Bullet({ x, y, angle: adjustedAngle }));
        }
        this.setShaking(SHAKE.duration);
    }

    setShaking(duration) {
        this.model.shaking = true;
        this.model.shakeDuration = duration;
    }

    mouseUp(event) {
        if (!this.getWeapon()) return;
        if (this.getWeapon().getBattleType() === "distant") {
            clearInterval(this.getWeapon().getShootingInterval());
            this.getWeapon().setShootingInterval(null);
        }
        if (this.getWeapon().getBattleType() === "close") {
            if (this.getStacked()) {
                this.removeMeleeStrike();
                this.setStacked(false);
            }
            this.setIsStriking(false);
        }
    }

    strike() {
        if (this.getIsStriking() || (!this.getIsStriking() && this.getMeleeStrike()) || this.getStacked() === true) return;

        this.setIsStriking(true);

        this.createMeleeStrike();
        this.getMeleeStrike().toLeft();
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
        }
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
        if (!this.isAlive()) return;
        if (this.getStacked()) return;
        this.model.updatePosition();

        if (!this.getMeleeStrike()) return;
        if (this.getMeleeStrike().isAnimating) {
            this.getMeleeStrike().update(this.getPosition(), this.getAngle(), this.getIsStriking());
        } else {
            this.removeMeleeStrike();
        }
    }

    die(position) {
        super.die();
        this.model.isReborning = true;
        setTimeout(() => {this.reborn(position)}, 5000);
    }

    reborn({x, y}) {
        this.model.isReborning = false;
        this.addHeal(this.getMaxHealth());
        this.model.x = x;
        this.model.y = y;
    }

    isReborning() {
        return this.model.isReborning;
    }

    getCursorPosition() {
        return { x: this.cursorX, y: this.cursorY };
    }

    getPosition() {
        return { x: this.model.x, y: this.model.y };
    }

    getDamage() {
        return this.model.damage;
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

    getChange() {
        return this.model.healthChange;
    }

    getDamage() {
        return this.model.healthChange.damage;
    }

    addDamage(id, value) {
        if (!this.model.healthChange.damage[id]) this.model.healthChange.damage[id] = 0;
        this.model.healthChange.damage[id] += value;
    }

    clearDamage() {
        this.model.healthChange.damage = {};
    }

    getHeal() {
        return this.model.healthChange.heal;
    }

    addHeal(value) {
        this.model.healthChange.heal += value;
    }

    clearHeal() {
        this.model.healthChange.heal = 0;
    }

    setAnimating(value) {
        this.model.meleeStrike.isAnimating = value;
    }

    getAnimating() {
        return this.model.meleeStrike.isAnimating;
    }

    move(dx, dy) {
        this.model.move(dx, dy);
        if (this.getMeleeStrike()){
            this.getMeleeStrike().move(dx, dy);
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

    getDirection() {
        if (this.getMeleeStrike()) {
            //console.log(this.getMeleeStrike())
            return this.getMeleeStrike().direction;
        }
    }

    getIsAnimating() {
        if (this.getMeleeStrike()) return this.getMeleeStrike().isAnimating;
    }

    getCurrentAngle() {
        if (this.getMeleeStrike()) return this.getMeleeStrike().currentAngle;
    }
}

export { PlayerController };
