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
        //console.log(weaponId, entity.getWeapon());
        const weapon = entity.getWeapon();
        const animation = entity.getTrajectory();
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle + 90 * RAD);
        if ((!animation && !weaponId) || (!animation && (weapon && weapon.getName() === "knife")) || (animation && animation.isAnimating && weaponId)) {
            this.context.drawImage(skin.body.none, -ENTITY.w/2, -ENTITY.h/2, ENTITY.w, ENTITY.h);
            this.context.drawImage(skin.head, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
        } else if (weaponId in [0, 1, 3, 4, 5, 6]) {
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

    drawHealthBar(entity, entityHeight) {
        const health = entity.getHealth();
        const maxHealth = entity.getMaxHealth();
        const rows = Math.ceil(maxHealth / HEALTH.squaresPerRow);
        const { x, y } = entity.getPosition();

        this.context.save();
        let squaresDrawn = 0;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < HEALTH.squaresPerRow; col++) {
                const squareX = x - (HEALTH.squaresPerRow * (HEALTH.squareSize + HEALTH.gap)) / 2 + col * (HEALTH.squareSize + HEALTH.gap);
                const squareY = y + entityHeight / 2 + HEALTH.offsetY + row * (HEALTH.squareSize + HEALTH.gap);
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

    drawEnemyHealthBar(enemy) {
        if (enemy.model.active) this.drawHealthBar(enemy, ENTITY.radius * 2);
    }

    drawPlayerHealthBar(player) {
        this.drawHealthBar(player, ENTITY.radius * 2);
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
