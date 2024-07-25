import { EntityView } from "../Entity/EntityView.js";
import {WINDOW, LEADER_BOARD, INTERFACE, CELL, SHAKE, DRAW_BULLETS_AMOUNT, RAD} from "../../CONST.js";


class EngineView {
    constructor(canvas) {
        this.canvas = canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = canvas.getContext("2d");
        this.entityView = new EntityView(this.context);
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;
        this.gradientOffset = 0;
        this.pointer = new Image();
        this.pointer.src = INTERFACE.pointer;
    }

    draw(model) {
        const [field, player, enemies, bots] = [model.field, model.player, model.enemies, model.bots]
        field.drawGround(this.context);
        field.drawCorpse(this.context);
        this.drawBullets(player.getBullets(), field);
        field.drawAidKits(this.context);
        field.drawWeapons([].concat(player, Object.values(enemies)), this.context);
        field.drawAmmunition(this.context);
        if (player.getMeleeStrike()) player.getMeleeStrike().draw(this.context);
        if (player.isAlive()) this.entityView.draw(player);

        this.entityView.drawNickname(player);

        Object.values(enemies).forEach(enemy => {
            this.drawEnemy(enemy, field);
        });

        Object.values(bots).map(bot => {
            this.entityView.drawBot(bot);
            
            this.entityView.drawEnemyHealthBar(bot);

            this.drawBullets(bot.getBullets(), field)
        })

        field.drawWalls(this.context);
        
        this.entityView.drawPlayerHealthBar(player);
        this.entityView.drawBulletAmount(player);
        if (model.leaderBoardView) this.drawLeaderBoard(player.leaderBoard);
        this.entityView.drawCursor(player.getCursorPosition());
        if (model.mode.timer) field.drawTimer(this.context);

        if (model.mode.area) this.drawDeathArea(model.area);

        if (model.mode.endPoint) this.drawEndArea(model.area);

        this.drawPointer(player, model.pointer)
        this.drawGradientOverlay();
        this.drawHealthOverlay(player.getHealth(), player.getMaxHealth());
    }

    drawEndArea(area) {
        this.context.fillStyle = 'rgba(0, 150, 0, 0.3)';
        this.context.lineWidth = 1;
        this.context.beginPath();
        this.context.arc(area.x, area.y, area.radius, 0, Math.PI * 2);
        this.context.fill();
    }

    drawDeathArea(area) {
        this.context.strokeStyle = 'rgba(255, 0, 0, 0.3)';
        this.context.lineWidth = 1000;
        this.context.beginPath();
        this.context.arc(area.x, area.y, area.radius, 0, Math.PI * 2);
        this.context.stroke();
    }

    drawEnemy(enemy, field) {
        if (!enemy.model.visible) return;
        if (enemy.isAlive()) {
            if (enemy.getMeleeStrike() && enemy.model.active === true) {
                enemy.getMeleeStrike().draw(this.context);
            }
            this.entityView.draw(enemy);

            this.entityView.drawEnemyHealthBar(enemy);
        }
        this.drawBullets(enemy.getBullets(), field);
        this.entityView.drawNickname(enemy);
    }

    drawBullets(bullets, field) {
        let indexX, indexY;
        bullets.map(bullet => {
            indexX = Math.floor((bullet.x + bullet.h * Math.cos(bullet.angle) - field.x) / CELL.w);
            indexY = Math.floor((bullet.y + bullet.h * Math.sin(bullet.angle) - field.y) / CELL.h);
            if (
                indexX >= 0 && 
                indexX <= field.w && 
                indexY >= 0 && 
                indexY <= field.h && 
                field.cells[indexX][indexY] && 
                field.cells[indexX][indexY].active
            ) bullet.draw(this.context);
        });
    }

    drawLeaderBoard(list) {
        this.context.fillStyle = "rgba(0,0,0,0.5)";
        const { width, height } = this.canvas;
        this.context.fillRect(0, 0, width, height);
        this.context.font = '64px Nosifer';
        this.context.fillStyle = 'white';
        this.context.fillText('Leader Board', LEADER_BOARD.w, LEADER_BOARD.h);
        let counter = 1;
        let keys = Object.keys(list);
        keys.sort((a, b) => list[b].kills - list[a].kills);
        keys.map(key => {
            this.context.font = '28px Russo One';
            this.context.fillStyle = 'white';
            this.context.fillText(list[key].name, LEADER_BOARD.w, LEADER_BOARD.h + counter * 75);
            this.context.fillText(list[key].kills, LEADER_BOARD.amount, LEADER_BOARD.h + counter * 75);
            counter++;
        })
    }

    update(model) {
        model.field.clearFrame(this.context);
        if (model.isShaking()) {
            this.applyShake();
        } else {
            this.resetShake();
        }
        this.draw(model);
    }

    drawPointer(player, pointer){
        this.context.save();
        this.context.translate(player.model.x, player.model.y);
        const angle = Math.atan2(pointer.y - player.model.y, pointer.x - player.model.x);
        this.context.rotate(angle);
        this.context.drawImage(this.pointer, INTERFACE.w * 2, -INTERFACE.h, INTERFACE.w, INTERFACE.h)
        this.context.restore();
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


    drawGradientOverlay() {
        const { width, height } = this.canvas;
        const gradient = this.context.createLinearGradient(0, 0, width, height);

        // Вычисляем значения цвета на основе gradientOffset
        const r = Math.floor(127 * (1 + Math.sin(Math.PI * this.gradientOffset)));
        const g = Math.floor(127 * (1 + Math.sin(Math.PI * (this.gradientOffset + 2 / 3))));
        const b = Math.floor(127 * (1 + Math.sin(Math.PI * (this.gradientOffset + 4 / 3))));

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.17)`);
        gradient.addColorStop(1, `rgba(${b}, ${r}, ${g}, 0.17)`);

        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, width, height);

        // Обновляем gradientOffset
        this.gradientOffset += 0.01;
        if (this.gradientOffset >= 2) {
            this.gradientOffset = 0;
        }
    }

    drawHealthOverlay(health, maxHealth) {
        const { width, height } = this.canvas;
        const healthRatio = health / maxHealth;

        const minRed = 170;
        const r = Math.min(255, Math.floor(minRed + (255 - minRed) * (1 - healthRatio)));

        const g = 0; // Выключаем зеленый цвет для большей красноты
        const b = 0; // Выключаем синий цвет для большей красноты

        const minAlpha = 0.08;
        const maxAlpha = 0.35;
        const alpha = minAlpha + (maxAlpha - minAlpha) * (1 - healthRatio);

        this.context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        this.context.fillRect(0, 0, width, height);
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