import {ENTITY, RAD, INTERFACE, HEALTH_BAR} from "../../CONST.js";

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
        const weapon = entity.getWeapon();
        const animation = entity.getMeleeStrike();
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle + 90 * RAD);
        if ((!animation && !weapon) || (!animation && (weapon && weapon.getName() === "knife")) || (animation && animation.isAnimating && weapon)) {
            this.context.drawImage(skin.body.none, -ENTITY.w/2, -ENTITY.h/2, ENTITY.w, ENTITY.h);
            this.context.drawImage(skin.head, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
        } else switch (weapon.getName()) {
            case "glock":
            case "uzi": 
                this.context.drawImage(skin.body.one, -ENTITY.wWithWeapon/2, -ENTITY.hWithWeapon/1.5, ENTITY.wWithWeapon, ENTITY.hWithWeapon);
                this.context.drawImage(skin.head, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
                break;
            case "shotGun":
            case "rifle":
                this.context.drawImage(skin.body.two, -ENTITY.wWithWeapon/2, -ENTITY.hWithWeapon/1.5, ENTITY.wWithWeapon, ENTITY.hWithWeapon);
                this.context.drawImage(skin.head, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
                break;
        }
        this.context.restore();
    }

    drawBot(bot) {
        if (!bot.isActive()) return;
        const gunSkin = bot.getBotSkin();
        const angle = bot.getAngle();

        const { x, y } = bot.getPosition();
        this.context.save();
        this.context.translate(x, y);
        this.context.drawImage(gunSkin.legs, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
        this.context.restore();

        this.context.save();
        this.context.translate(x, y);
        if (bot.model.isAlive)
        this.context.rotate(angle);
        if (bot.model.isAlive) {
            this.context.drawImage(gunSkin.alive, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);
        } else {
            this.context.rotate(angle);
            this.context.drawImage(gunSkin.died, -ENTITY.radius, -ENTITY.radius, ENTITY.radius * 2, ENTITY.radius * 2);

        }
        this.context.restore();
    }

    drawCursor(cursor) {
        this.context.drawImage(this.cursor, cursor.x - this.cursor.width / 2, cursor.y - this.cursor.height / 2);
    }

    drawHealthBar(entity, entityHeight) {
        const health = entity.getHealth();
        const maxHealth = entity.getMaxHealth();
        const rows = Math.ceil(maxHealth / HEALTH_BAR.squaresPerRow);
        const { x, y } = entity.getPosition();

        this.context.save();
        let squaresDrawn = 0;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < HEALTH_BAR.squaresPerRow; col++) {
                const squareX = x - (HEALTH_BAR.squaresPerRow * (HEALTH_BAR.squareSize + HEALTH_BAR.gap)) / 2 + col * (HEALTH_BAR.squareSize + HEALTH_BAR.gap);
                const squareY = y + entityHeight / 2 + HEALTH_BAR.offsetY + row * (HEALTH_BAR.squareSize + HEALTH_BAR.gap);
                const index = row * HEALTH_BAR.squaresPerRow + col;

                if (index >= maxHealth) {
                    break;
                }

                this.context.fillStyle = index < health ? "red" : "gray";
                this.context.fillRect(squareX, squareY, HEALTH_BAR.squareSize, HEALTH_BAR.squareSize);
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
