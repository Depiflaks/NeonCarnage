import {ENTITY, RAD, INTERFACE, WINDOW} from "../../CONST.js";

class EntityView {
    constructor(context) {
        this.context = context;
        this.headImage = new Image();
        this.headImage.src = ENTITY.headColor;
        this.bodyImage = new Image();
        this.bodyImage.src = ENTITY.bodyColor;
        this.bodyWithWeaponImage = new Image();
        this.bodyWithWeaponImage.src = ENTITY.bodyWithWeapon;
        this.cursor = new Image();
        this.cursor.src = INTERFACE.cursor;
    }

    draw(entity) {
        if (!entity.isActive()) return;
        const {x, y} = entity.getPosition();
        const angle = entity.getAngle();
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle + 90 * RAD);
        if (entity.getWeapon()) {
            this.context.drawImage(this.bodyWithWeaponImage, -ENTITY.wWithWeapon/2, -ENTITY.hWithWeapon/1.5, ENTITY.wWithWeapon, ENTITY.hWithWeapon);
            this.context.drawImage(this.headImage, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
        } else {
            this.context.drawImage(this.bodyImage, -ENTITY.w/2, -ENTITY.h/2, ENTITY.w, ENTITY.h);
            this.context.drawImage(this.headImage, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
        }
        this.context.restore();
    }

    drawCursor(cursor) {
        this.context.drawImage(this.cursor, cursor.x - this.cursor.width / 2, cursor.y - this.cursor.height / 2);
    }

    drawEnemyHealthBar(x, y, health) {
        const barWidth = PLAYER.w;
        const barHeight = 20;
        const offset = 15;
        const maxHealth = 5;

        // Background
        this.context.fillStyle = "gray";
        this.context.fillRect(x - barWidth / 2, y - PLAYER.radius - offset - barHeight, barWidth, barHeight);

        // Health
        const healthWidth = (barWidth * health) / maxHealth;
        this.context.fillStyle = "red";
        this.context.fillRect(x - barWidth / 2, y - PLAYER.radius - offset - barHeight, healthWidth, barHeight);
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
