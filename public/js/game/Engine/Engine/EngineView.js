import { EntityView } from "../Entity/EntityView.js";
import {WINDOW, RAD, ENTITY, CELL, SHAKE} from "../../CONST.js";


class EngineView {
    constructor(canvas) {
        this.canvas = canvas
        canvas.width = WINDOW.w;
        canvas.height = WINDOW.h;
        this.context = canvas.getContext("2d");
        this.entityView = new EntityView(this.context);
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;
    }

    draw(field, player, enemies) {
        field.drawGround(this.context);
        this.drawBullets(player.getBullets(), field);
        field.drawBonuses(this.context);
        field.drawWeapons(player.getPosition(), player.getAngle(), player.getTrajectory(), this.context);
        field.drawAmmunition(this.context);
        this.entityView.draw(player);
        if (player.getTrajectory()) player.getTrajectory().draw(this.context);
        Object.values(enemies).map(enemy => {
            this.entityView.draw(enemy);
            this.drawBullets(enemy.getBullets(), field);
        })
        field.drawWalls(this.context);
        this.entityView.drawHealthBar(player.getHealth());
        this.drawBulletAmount(player);
        this.entityView.drawCursor(player.getCursorPosition());
    }

    drawBullets(bullets, field) {
        let indexX, indexY;
        bullets.map(bullet => {
            indexX = Math.floor((bullet.x + bullet.h * Math.cos(bullet.angle) - field.x) / CELL.w);
            indexY = Math.floor((bullet.y + bullet.h * Math.sin(bullet.angle) - field.y) / CELL.h);
            if (indexX >= 0 && indexX <= field.w && indexY >= 0 && indexY <= field.h && field.cells[indexX][indexY].active) bullet.draw(this.context);
        });
    }

    drawBulletAmount(player) {
        if((player.getWeapon() != null) && (player.getWeapon().getBattleType() === "distant")) {
            this.context.font = "48px roboto";
            this.context.fillText(player.getWeapon().getAmount(), 10, 50);
        }
    }

    update(field, player, enemies, isShaking) {
        field.clearFrame(this.context);

        if (isShaking) {
            this.applyShake();
        } else {
            this.resetShake();
        }
        this.draw(field, player, enemies);
    }

    applyShake() {
        this.shakeOffsetX = Math.random() * SHAKE.scale - SHAKE.relocateRange;
        this.shakeOffsetY = Math.random() * SHAKE.scale - SHAKE.relocateRange;
        this.context.save();
        this.context.translate(this.shakeOffsetX, this.shakeOffsetY);
    }

    resetShake() {
        this.context.restore();
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;
    }

    drawLine(x1, y1, x2, y2, color, field) {
        this.context.lineWidth = 1;
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.moveTo(x1 + field.x, y1 + field.y);
        this.context.lineTo(x2 + field.x, y2 + field.y);
        this.context.stroke();
    }

    drawCircle(x, y, radius, color, field) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x + field.x, y + field.y, radius, 0, Math.PI * 2, true);
        this.context.fill();
    }

    strokeCircle(x, y, radius, color, field) {
        this.context.strokeStyle = color;
        this.context.beginPath();
        this.context.arc(x + field.x, y + field.y, radius, 0, Math.PI * 2, true);
        this.context.stroke();
    }
}


export { EngineView };