import { PLAYER_SET } from "../settings.js";

class PlayerView {
    constructor(context) {
        this.context = context;
    }

    draw({x, y}, angle) {
        this.context.strokeStyle = PLAYER_SET.bodyColor;
        this.context.lineWidth = PLAYER_SET.h;
        this.context.beginPath();
        this.context.moveTo(
            x - PLAYER_SET.w * Math.cos(angle + Math.PI / 2) / 2,
            y - PLAYER_SET.w * Math.sin(angle + Math.PI / 2) / 2
        );
        this.context.lineTo(
            x + PLAYER_SET.w * Math.cos(angle + Math.PI / 2) / 2,
            y + PLAYER_SET.w * Math.sin(angle + Math.PI / 2) / 2
        );
        this.context.stroke();

        this.context.lineWidth = 1;
        this.context.fillStyle = PLAYER_SET.headColor;
        this.context.beginPath();
        this.context.arc(x, y, PLAYER_SET.radius, 0, Math.PI * 2, true);
        this.context.fill();

        this.drawViewLine(x, y, angle);
    }

    drawViewLine(x, y, angle) {
        this.context.lineWidth = 2;
        this.context.strokeStyle = "red";
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x + 300 * Math.cos(angle), y + 300 * Math.sin(angle));
        this.context.stroke();
    }

    drawBullets(bullets) {
        bullets.map(
            bullet => {
                bullet.draw(this.context);
            }
        );
    }

    drawBulletAmount(player) {
        if((player.weapon != null) && (player.weapon.model.battleType == "distant")) {
            this.context.font = "48px serif";
            this.context.fillText(player.weapon.model.amount, 10, 50);
        }
    }
}

export { PlayerView };
