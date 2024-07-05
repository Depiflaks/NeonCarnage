import { PLAYER, RAD } from "../../CONST.js";

class PlayerView {
    constructor(context) {
        this.context = context;
        this.headImage = new Image();
        this.headImage.src = PLAYER.headColor;
        this.bodyImage = new Image();
        this.bodyImage.src = PLAYER.bodyColor;
        this.bodyWithWeaponImage = new Image();
        this.bodyWithWeaponImage.src = PLAYER.bodyWithWeapon;
    }

    draw({x, y}, weapon, angle) {
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(angle + 90 * RAD);
        if (weapon != null) {
            this.context.drawImage(this.bodyWithWeaponImage, -PLAYER.wWithWeapon/2, -PLAYER.hWithWeapon/1.5, PLAYER.wWithWeapon, PLAYER.hWithWeapon);
            this.context.drawImage(this.headImage, -PLAYER.radius, -PLAYER.radius, PLAYER.radius * 2, PLAYER.radius * 2);
        } else {
            this.context.drawImage(this.bodyImage, -PLAYER.w/2, -PLAYER.h/2, PLAYER.w, PLAYER.h);
            this.context.drawImage(this.headImage, -PLAYER.radius, -PLAYER.radius, PLAYER.radius * 2, PLAYER.radius * 2);
        }
        this.context.restore();
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
        this.context.fillRect(offsetX, PLAYER.radius + offsetY - barHeight, barWidth, barHeight);

        // Health
        const healthWidth = (barWidth * health) / maxHealth;
        this.context.fillStyle = "red";
        this.context.fillRect(offsetX, PLAYER.radius + offsetY - barHeight, healthWidth, barHeight);
    }
}

export { PlayerView };
