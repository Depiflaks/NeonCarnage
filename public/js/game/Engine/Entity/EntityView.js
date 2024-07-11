import {ENTITY, RAD, INTERFACE} from "../../CONST.js";

class EntityView {
    constructor(context) {
        this.context = context;
        this.cursor = new Image();
        this.cursor.src = INTERFACE.cursor;
    }

    draw(entity) {
        if (!entity.isActive()) return;
        const skin = entity.getSkin();
        const {x, y} = entity.getPosition();
        const angle = entity.getAngle();
        const weaponId = entity.getWeaponId();
        const weapon = entity.getWeapon();
        const animation = entity.getTrajectory();
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle + 90 * RAD);
        if ((!animation && !weaponId) || (!animation && (weapon && weapon.getName() === "knife")) || (animation && animation.isAnimating && weaponId)) {
            this.context.drawImage(skin.body.none, -ENTITY.w/2, -ENTITY.h/2, ENTITY.w, ENTITY.h);
            this.context.drawImage(skin.head, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
        } else if (weapon && (weapon.getName() === "pistol" || weapon.getName() === "glock")) {
                this.context.drawImage(skin.body.one, -ENTITY.wWithWeapon/2, -ENTITY.hWithWeapon/1.5, ENTITY.wWithWeapon, ENTITY.hWithWeapon);
                this.context.drawImage(skin.head, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
        } else {   
                this.context.drawImage(skin.body.two, -ENTITY.wWithWeapon/2, -ENTITY.hWithWeapon/1.5, ENTITY.wWithWeapon, ENTITY.hWithWeapon);
                this.context.drawImage(skin.head, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
        }
        this.context.restore();
    }

    drawDead(entity) {
        if (entity.isAlive()) return;
        const {x, y} = entity.getPosition();
        const angle = entity.getAngle();
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
        const squareSize = 15;
        const squaresPerRow = 10;
        const rows = 2;
        const offsetX = 10;
        const offsetY = 45;
        const gap = 5; // Gap between squares
        const maxHealth = 20;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < squaresPerRow; col++) {
                const x = offsetX + col * (squareSize + gap);
                const y = ENTITY.radius + offsetY + row * (squareSize + gap);
                const index = row * squaresPerRow + col;

                if (index < health) {
                    this.context.fillStyle = "red";
                } else {
                    this.context.fillStyle = "gray";
                }

                this.context.fillRect(x, y, squareSize, squareSize);
            }
        }
    }


}

export { EntityView };
