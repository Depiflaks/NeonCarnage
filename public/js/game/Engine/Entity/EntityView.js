import {ENTITY, RAD, INTERFACE, HEALTH} from "../../CONST.js";

class EntityView {
    constructor(context) {
        this.context = context;
        this.cursor = new Image();
        this.cursor.src = INTERFACE.cursor;
    }

    draw(entity) {
        if (!entity.isActive()) return;
        const skin = entity.getSkin();
        const { x, y } = entity.getPosition();
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
        const { x, y } = entity.getPosition();
        const angle = entity.getAngle();
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle + 90 * RAD);
        this.context.restore();
    }

    drawCursor(cursor) {
        this.context.drawImage(this.cursor, cursor.x - this.cursor.width / 2, cursor.y - this.cursor.height / 2);
    }

    drawEnemyHealthBar(entity) {
        if (!entity.isActive()) return;
        const {x, y} = entity.getPosition();
        const health = entity.getHealth();
        const maxHealth = entity.getMaxHealth();
        const barWidth = ENTITY.w;
        const barHeight = 10;  // Narrower bar
        const offset = 20;    // Offset from the enemy
        this.context.save();
        // Background
        this.context.fillStyle = "gray";
        this.context.fillRect(x - barWidth / 2, y - ENTITY.radius - offset, barWidth, barHeight);

        // Health
        const healthWidth = (barWidth * health) / maxHealth;
        this.context.fillStyle = "red";
        this.context.fillRect(x - barWidth / 2, y - ENTITY.radius - offset, healthWidth, barHeight);
        this.context.restore();
    }

    drawHealthBar(player) {
        const health = player.getHealth();
        const maxHealth = player.getMaxHealth();
        const rows = Math.ceil(maxHealth / HEALTH.squaresPerRow);
        const { x, y } = player.getPosition();
        const playerHeight = ENTITY.radius * 2;

        this.context.save();
        let squaresDrawn = 0;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < HEALTH.squaresPerRow; col++) {
                const squareX = x - (HEALTH.squaresPerRow * (HEALTH.squareSize + HEALTH.gap)) / 2 + col * (HEALTH.squareSize + HEALTH.gap);
                const squareY = y + playerHeight / 2 + HEALTH.offsetY + row * (HEALTH.squareSize + HEALTH.gap);
                const index = row * HEALTH.squaresPerRow + col;

                if (index >= maxHealth) {
                    break;
                }

                this.context.fillStyle = index < health ? "red" : "gray";
                this.context.fillRect(squareX, squareY, HEALTH.squareSize, HEALTH.squareSize);
                squaresDrawn++;

                if (squaresDrawn >= maxHealth) {
                    break;
                }
            }
        }
        this.context.restore();
    }

    drawNickname(entity) {
        const { x, y } = entity.getPosition();
        const nickname = entity.getNickname();
        if (nickname && entity.model.active) {
            this.context.save();
            this.context.font = "16px Russo One";
            this.context.fillStyle = "white";
            this.context.textAlign = "center";
            this.context.fillText(nickname, x, y - ENTITY.radius - 20);
            this.context.restore();
        }
    }
}

export { EntityView };
