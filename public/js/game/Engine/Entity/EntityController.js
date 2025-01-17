import { WEAPON_STATE } from "../../CONST.js";
import { MeleeStrike } from "../Weapon/MeleeStrike/MeleeStrike.js";
import { Skin } from "./Skin/Skin.js";
import {BotModel} from "./Bot/BotModel.js";

class EntityController {
    constructor() {}

    getPosition() {
        return { x: this.model.x, y: this.model.y };
    }

    getHealth() {
        return this.model.health;
    }

    getMaxHealth() {
        return this.model.maxHealth;
    }

    isAlive() {
        return this.model.isAlive;
    }

    die() {
        if(!this.getWeapon()) return;
        this.model.stacked = false;
        this.removeMeleeStrike();
    }

    setAlive(value) {
        this.model.isAlive = value;
    }

    setHealth(value) {
        this.model.health = value;
    }

    setAngle(angle) {
        this.model.angle = angle;
    }

    getAngle() {
        return this.model.angle;
    }
    
    getVisible() {
        return this.model.visible;
    }

    setVisible(value) {
        this.model.visible = value;
    }

    getSkinId() {
        return this.model.skinId;
    }

    getWeapon() {
        return this.model.weapon;
    }

    setWeapon(weapon) {
        this.model.weapon = weapon;
        if (weapon)
        this.setWeaponId(weapon ? weapon.getId() : null);
    }

    getWeaponId() {
        return this.model.weaponId;
    }

    setWeaponId(id) {
        this.model.weaponId = id;
    }

    createMeleeStrike(soundController) {
        this.model.meleeStrike = new MeleeStrike(this.model.x, this.model.y, this.model.angle, soundController);
    }

    removeMeleeStrike() {
        this.model.meleeStrike = null;
    }

    getMeleeStrike() {
        return this.model.meleeStrike;
    }

    setMeleeStrike(currentAngle, isAnimating, direction, isStriking) {
        this.model.meleeStrike.currentAngle = currentAngle;
        this.model.meleeStrike.isAnimating = isAnimating;
        this.model.meleeStrike.direction = direction;
        this.model.meleeStrike.isStriking = isStriking
    }

    isActive() {
        return this.model.active;
    }

    getBullets() {
        return this.model.bullets;
    }

    setBullets(bullets) {
        this.model.bullets = bullets;
    }

    getSkin() {
        return this.model.skin;
    }

    setSkin(skinId) {
        this.model.skinId = skinId;
        this.model.skin = new Skin(skinId);
    }

    getNickname() {
        return this.model.nickname;
    }

    setNickname(value) {
        this.model.nickname = value;
    }

    setDirection(value) {
        this.model.meleeStrike.direction = value;
    }

    getIsAnimating() {
        return this.model.meleeStrike.isAnimating;
    }

    setMeleeStrikePosition({x, y}) {
        this.model.meleeStrike.x = x;
        this.model.meleeStrike.y = y;
    }

    setMeleeStrikeAngle(value) {
        this.model.meleeStrike.angle = value;
    }
    addVisibleBot(botId) {
        this.model.visibleBots.add(botId);
    }

    removeVisibleBot(botId) {
        this.model.visibleBots.delete(botId);
    }

    getVisibleBots() {
        return Array.from(this.model.visibleBots);
    }

    setVisibleBots(botIds) {
        this.model.visibleBots = new Set(botIds);
    }

    clearVisibleBots() {
        this.model.visibleBots.clear();
    }
}

export {EntityController}