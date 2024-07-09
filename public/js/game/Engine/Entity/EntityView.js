import {ENTITY, RAD, INTERFACE, SKINS} from "../../CONST.js";

class EntityView {
    constructor(context) {
        this.context = context;
        this.cursor = new Image();
        this.cursor.src = INTERFACE.cursor;
        this.headImage = new Image();
        this.bodyImage = new Image();
        this.bodyWithWeaponImage = new Image();
        this.bodyWithPistolsImage = new Image();
    }

    draw(entity) {
        if (!entity.isActive()) return;
        this.headImage.src = SKINS[entity.getSkinId()].head;
        this.bodyImage.src = SKINS[entity.getSkinId()].body;
        this.bodyWithWeaponImage.src = SKINS[entity.getSkinId()].bodyWithWeapon;
        this.bodyWithPistolsImage.src = SKINS[entity.getSkinId()].bodyWithPistols;
        const {x, y} = entity.getPosition();
        const angle = entity.getAngle();
        const weapon = entity.getWeapon();
        const animation = entity.getTrajectory();
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle + 90 * RAD);
        if (((animation === null) && (weapon === null)) || ((animation === null) && (weapon.model.name === "knife")) || (((animation) && (animation.isAnimating)) && (weapon))) {
            this.context.drawImage(this.bodyImage, -ENTITY.w/2, -ENTITY.h/2, ENTITY.w, ENTITY.h);
            this.context.drawImage(this.headImage, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
        } else {
            if ((weapon.model.name === "pistol") || (weapon.model.name === "glock")) {
                this.context.drawImage(this.bodyWithPistolsImage, -ENTITY.wWithWeapon/2, -ENTITY.hWithWeapon/1.5, ENTITY.wWithWeapon, ENTITY.hWithWeapon);
                this.context.drawImage(this.headImage, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
            } else {   
                this.context.drawImage(this.bodyWithWeaponImage, -ENTITY.wWithWeapon/2, -ENTITY.hWithWeapon/1.5, ENTITY.wWithWeapon, ENTITY.hWithWeapon);
                this.context.drawImage(this.headImage, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
            }
        }
        this.context.restore();
    }

    drawDead(entity) {
        if (entity.isAlive()) return;
        const {x, y} = entity.getPosition();
        const angle = entity.getAngle();
        const animation = entity.getTrajectory();
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle + 90 * RAD);
        this.context.restore();
    }

    drawCursor(cursor) {
        this.context.drawImage(this.cursor, cursor.x - this.cursor.width / 2, cursor.y - this.cursor.height / 2);
    }

    drawEnemyHealthBar(x, y, health, maxHealth) {
        const barWidth = ENTITY.w;
        const barHeight = 10;  // Более тонкий бар
        const offset = 20;    // Отступ от врага

        // Background
        this.context.fillStyle = "gray";
        this.context.fillRect(x - barWidth / 2, y - ENTITY.radius - offset, barWidth, barHeight);

        // Health
        const healthWidth = (barWidth * health) / maxHealth;
        this.context.fillStyle = "red";
        this.context.fillRect(x - barWidth / 2, y - ENTITY.radius - offset, healthWidth, barHeight);
    }

    drawHealthBar(health) {
        const barWidth = 100;
        const barHeight = 20;
        const offsetY = 65;
        const offsetX = 10;
        const maxHealth = 5;

        // Background
        this.context.fillStyle = "gray";
        this.context.fillRect(offsetX, ENTITY.radius + offsetY - barHeight, barWidth, barHeight);

        // Health
        const healthWidth = (barWidth * health) / maxHealth;
        this.context.fillStyle = "red";
        this.context.fillRect(offsetX, ENTITY.radius + offsetY - barHeight, healthWidth, barHeight);
    }

}

export { EntityView };
