import {WINDOW, AIDKIT, ENTITY, WEAPON, WEAPON_STATE, SHAKE} from "../../../CONST.js";
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

    pickupAidKit(id, aidKit) {
        const { x, y } = this.getPosition();
        const distance = Math.sqrt((aidKit.x - x) ** 2 + (aidKit.y - y) ** 2);
        const currentHealth = this.getHealth();
        const maxHealth = this.getMaxHealth();
        if (distance <= AIDKIT.minDistance && currentHealth < maxHealth) {
            this.addAidKit(id);
        }
    }

    reborn() {
        this.model.isAlive = true;
        this.setHealth(this.getMaxHealth());
        this.setSpawnPoint();
    }

    shot() {
        if (this.getWeapon().getAmount() <= 0) return;
        this.getWeapon().decAmount();
        this.addAmount(-1);
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

    reborn({x, y}) {
        //console.log(x, y);
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
        return {
            damage: this.getDamage(),
            amount: this.getAmount(),
            weapon: {
                id: this.getChangeWeapon().id,
                state: this.getChangeWeapon().state
            },
            ammunitions: this.getAmmunition(),
            aidKits: this.getAidKit(),
        };
    }

    clearChange() {
        this.clearDamage();
        this.clearAmount();
        this.clearChangeWeapon();
        this.clearAmmunition();
        this.clearAidKit();
    }
// Damage
    getDamage() {
        return this.model.change.damage;
    }

    addDamage(id, value) {
        if (!this.model.change.damage[id]) this.model.change.damage[id] = 0;
        this.model.change.damage[id] += value;
    }

    clearDamage() {
        this.model.change.damage = {};
    }
// Weapon
    getChangeWeapon() {
        return this.model.change.weapon;
    }

    pickUpWeapon(weapon) {
        this.model.change.weapon.id = weapon.getId();
        //WEAPON_STATE.onTheGround : WEAPON_STATE.inTheHand
        this.model.change.weapon.state = WEAPON_STATE.inTheHand;
    }

    throwWeapon() {
        this.model.change.weapon.id = null;
        this.model.change.weapon.state = WEAPON_STATE.onTheGround;
    }

    clearChangeWeapon() {
        this.model.change.weapon.id = null;
        this.model.change.weapon.state = null;
    }
// Amount
    getAmount() {
        return this.model.change.amount;
    }

    addAmount(value) {
        this.model.change.amount += value;
    }

    clearAmount() {
        this.model.change.amount = 0;
    }
//  Ammunition
    getAmmunition() {
        return this.model.change.ammunitions;
    }

    addAmmunition(id) {
        this.model.change.ammunitions.push(id);
    }

    clearAmmunition() {
        this.model.change.ammunitions = [];
    }
//  AidKit
    getAidKit() {
        return this.model.change.aidKits;
    }

    addAidKit(id) {
        this.model.change.aidKits.push(id);
    }

    clearAidKit() {
        this.model.change.aidKits = [];
    }
// Other
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
