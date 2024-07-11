import { Cell } from "./Cell.js";
import { VerticalWall} from "./VerticalWall.js";
import { HorizontalWall} from "./HorizontalWall.js";
import { CELL, WINDOW } from "../../CONST.js";
import { WeaponController } from "../Weapon/WeaponController.js";
import { Drawable } from "../Interface/Drawable.js";
import { Bonus } from "../Collectable/Bonus.js";
import { Ammunition } from "../Collectable/Ammunition.js";
import { Corpse } from "./Corpse.js";

class BattleGround extends Drawable {
    constructor(groundList, wallList, weaponSet, ammunitionSet, bonusSet, spawnPoints) {
        
        let maxX = 0;
        let maxY = 0;
        groundList.map(
            ([x, y]) => {
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
            }
        );

        super(0, 0, maxX, maxY);
        this.spawnPoints = spawnPoints;
        this.cells = [];
        this.verticalWalls = [];
        this.horizontalWalls = [];
        this.weapons = [];
        this.ammunition = [];
        this.bonuses = [];
        this.corpse = [];

        this.cells = Array.from({ length: maxX + 1 }, () => Array(maxY + 1).fill(null));

        weaponSet.map(
            weapon => {
                this.weapons.push(new WeaponController(weapon));
            }
        );

        ammunitionSet.map(
            ammunition => {
                this.ammunition.push(new Ammunition(ammunition.x, ammunition.y, ammunition.image, ammunition.amount));
            }
        );

        bonusSet.map(
            bonus => {
                this.bonuses.push(new Bonus(bonus.x, bonus.y, bonus.image, bonus.amount));
            }
        );


        groundList.map(
            cell => {
                const [x, y] = cell;
                this.cells[x][y] = new Cell(x, y); 
            }
        );

        wallList.map(
            wall => {
                const [startX, startY, endX, endY] = wall;
                if (startX === endX) {
                    this.verticalWalls.push(new VerticalWall(startX, startY, endX, endY));
                } else if (startY === endY) {
                    this.horizontalWalls.push(new HorizontalWall(startX, startY, endX, endY));
                }
            } 
        );
    };

    update() {
        this.cells.map(row => row.map(cell => {if (cell) {cell.update()}}));
        this.hideCells();
    }

    getSpawnPoint() {
        const {x, y} = this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];
        return {x: x + this.x, y: y + this.y};
    }

    drawGround(context) {
        this.cells.map(row => row.map(cell => { if(cell) {cell.draw(context)}}));
    }

    drawWalls(context) {
        this.horizontalWalls.map(wall => wall.draw(context));
        this.verticalWalls.map(wall => wall.draw(context));
    }

    drawWeapons(entities, context) {
        let indexX, indexY;
        //console.log(this.weapons);
        this.weapons.map(weapon => {
            indexX = Math.floor((weapon.model.x - this.x) /  CELL.w);
            indexY = Math.floor((weapon.model.y - this.y) / CELL.h);
            if (this.cells[indexX][indexY] && this.cells[indexX][indexY].active) weapon.view.draw(
                weapon, 
                entities, 
                context
            );
        })
    }

    drawAmmunition(context) {
        let indexX, indexY;
        this.ammunition.map(ammunition => {
            indexX = Math.floor((ammunition.x - this.x) / CELL.w);
            indexY = Math.floor((ammunition.y - this.y) / CELL.h);
            if ((this.cells[indexX][indexY]) && ammunition.active && this.cells[indexX][indexY].active) {
                ammunition.draw(context);
            }
        });
    }

    drawBonuses(context) {
        let indexX, indexY;
        this.bonuses.map(bonus => {
            indexX = Math.floor((bonus.x - this.x) / CELL.w);
            indexY = Math.floor((bonus.y - this.y) / CELL.h);
            if (this.cells[indexX][indexY] && bonus.active && this.cells[indexX][indexY].active) {
                bonus.draw(context);
            }
        });
    }

    drawCorpse(context) {
        let indexX, indexY;
        this.corpse.map(corp => {
            indexX = Math.floor(corp.x / CELL.w);
            indexY = Math.floor(corp.y / CELL.h);
            if (this.cells[indexX][indexY] && this.cells[indexX][indexY].active) corp.draw({dx: this.x, dy: this.y}, context);
        });
    }

    clearFrame(context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, WINDOW.w, WINDOW.h);
    }

    hideCells() {
        this.cells.map(row => row.map(cell => {
            if (cell) {
                cell.active = false
                cell.activeDirection = 1;
            }
        }));
    }

    getCorpse() {
        return this.corpse;
    }

    addCorpse(player) {
        const skinId = player.getSkinId();
        let {x, y} = player.getPosition();
        x -= this.x;
        y -= this.y;
        const corpse = new Corpse(x, y, skinId);
        const isCorpseExists = this.corpse.some(existingCorpse => 
            existingCorpse.x === x && 
            existingCorpse.y === y && 
            existingCorpse.skinId === skinId
        );
        
        if (!isCorpseExists) {
            this.corpse.push(corpse);
        }
        
    }

    mergeCorpse(corpse) {
        // Фильтруем элементы, исключая null и undefined
        const validCorpses = corpse.filter(corpseItem => corpseItem !== null && corpseItem !== undefined);
    
        // Добавляем элементы, проверяя на дублирование
        validCorpses.forEach(newCorpse => {
            const isDuplicate = this.corpse.some(existingCorpse =>
                existingCorpse.x === newCorpse.x &&
                existingCorpse.y === newCorpse.y &&
                existingCorpse.skinId === newCorpse.skinId
            );
    
            if (!isDuplicate) {
                this.corpse.push(newCorpse);
                console.log(this.corpse);
            }
        });
    }

    move(dx, dy) {
        super.move(dx, dy);
        this.cells.map(row => row.map(cell => {if (cell) {cell.move(dx, dy)}}));
        this.verticalWalls.map(wall => wall.move(dx, dy));
        this.horizontalWalls.map(wall => wall.move(dx, dy));
        this.weapons.map(weapon => weapon.model.move(dx, dy));
        this.ammunition.map(ammunition => ammunition.move(dx, dy));
        this.bonuses.map(bonus => bonus.move(dx, dy));
        this.corpse.map(corp => corp.move(dx, dy));
    }
}

export { BattleGround } 