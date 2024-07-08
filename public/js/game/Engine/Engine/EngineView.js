import { EntityView } from "../Entity/EntityView.js";
import { WINDOW, RAD, ENTITY, CELL } from "../../CONST.js";


class EngineView {
    constructor(canvas) {
        this.canvas = canvas
        canvas.width = WINDOW.w;
        canvas.height = WINDOW.h;
        this.context = canvas.getContext("2d");
        this.entityView = new EntityView(this.context);
    }

    draw(field, player, enemies) {
        field.drawGround(this.context);
        this.drawBullets(player.getBullets(), field);
        field.drawWeapons(player.getPosition(), player.getAngle(), player.getTrajectory(), this.context);
        field.drawBonuses(this.context);
        field.drawAmmunition(this.context);
        this.entityView.draw(player);
        if (player.getTrajectory()) player.getTrajectory().draw(this.context);
        Object.values(enemies).map(enemy => {this.entityView.draw(enemy)})
        field.drawWalls(this.context);
        this.entityView.drawHealthBar(player.getHealth());
        this.drawBulletAmount(player);
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
        if((player.getWeapon() != null) && (player.getWeapon().getBattleType() == "distant")) {
            this.context.font = "48px roboto";
            this.context.fillText(player.getWeapon().getAmount(), 10, 50);
        }
    }

    update(field, player, enemies) {
        field.clearFrame(this.context);
        this.draw(field, player, enemies);
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