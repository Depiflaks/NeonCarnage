import { Cell } from "./Components/Cell.js";
import { VerticalWall} from "./Components/Wall/VerticalWall.js";
import { HorizontalWall} from "./Components/Wall/HorizontalWall.js";
import { AMMUNITION, AIDKIT, CELL, SKINS, WINDOW } from "../../CONST.js";
import { WeaponController } from "../Weapon/WeaponController.js";
import { Drawable } from "../Interface/Drawable.js";
import { AidKit } from "./Collectable/AidKit.js";
import { Ammunition } from "./Collectable/Ammunition.js";
import { Corpse } from "./Components/Corpse.js";

class Field extends Drawable {
    constructor({groundList, wallList, weaponSet, ammunitionSet, aidKitSet, spawnPoints}) {
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
        this.cells = Array.from({ length: maxX + 1 }, () => Array(maxY + 1).fill(null));
        this.verticalWalls = [];
        this.horizontalWalls = [];
        this.weapons = {};
        this.ammunition = ammunitionSet.map(
            ammunition => new Ammunition(ammunition.x, ammunition.y, AMMUNITION.image, AMMUNITION.amount)
        );
        this.aidKits = aidKitSet.map(
            aidKit => new AidKit(aidKit.x, aidKit.y, AIDKIT.image, AIDKIT.amount)
        );

        this.corpses = {};

        this.corpseImages = []
        for (let i = 0; i < SKINS.length; i++) {
            this.corpseImages.push(new Image());
            this.corpseImages[i].src = SKINS[i].corpse
        }
        
        for (const weapon of weaponSet) {
            this.weapons[weapon.id] = new WeaponController(weapon);
        }

        for (const cell of groundList) {
            const [x, y] = cell;
            this.cells[x][y] = new Cell(...cell); 
        }

        for (const wall of wallList) {
            const [startX, startY, endX, endY] = wall;
            if (startX === endX) {
                this.verticalWalls.push(new VerticalWall(startX, startY, endX, endY));
            } 
            if (startY === endY) {
                this.horizontalWalls.push(new HorizontalWall(startX, startY, endX, endY));
            }
        }
    };

    update() {
        this.cells.forEach(row => row.forEach(cell => {if (cell) cell.update()}));
        this.hideCells();
    }

    drawGround(context) {
        this.cells.forEach(row => row.forEach(cell => { if(cell) {cell.draw(context)}}));
    }

    drawWalls(context) {
        this.horizontalWalls.forEach(wall => wall.draw(context));
        this.verticalWalls.forEach(wall => wall.draw(context));
    }

    drawTimer(context) {
        //console.log(this.timer);
        const red = this.timer < 16;
        context.save();
        context.font = red ? "40px Nosifer" : "35px Russo One";
        context.fillStyle = red ? "red" : "white";
        context.textAlign = "center";
        context.fillText(this.timer, window.innerWidth / 2, 50);
        context.restore();
    }

    drawWeapons(entities, context) {
        let indexX, indexY;
        Object.values(this.weapons).forEach(weapon => {
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
        this.ammunition.forEach(ammunition => {
            indexX = Math.floor((ammunition.x - this.x) / CELL.w);
            indexY = Math.floor((ammunition.y - this.y) / CELL.h);
            if ((this.cells[indexX][indexY]) && ammunition.active && this.cells[indexX][indexY].active) {
                ammunition.draw(context);
            }
        });
    }

    drawAidKits(context) {
        let indexX, indexY;
        this.aidKits.forEach(aidKit => {
            indexX = Math.floor((aidKit.x - this.x) / CELL.w);
            indexY = Math.floor((aidKit.y - this.y) / CELL.h);
            if (this.cells[indexX][indexY] && aidKit.active && this.cells[indexX][indexY].active) {
                aidKit.draw(context);
            }
        });
    }

    drawCorpse(context) {
        let indexX, indexY;
        Object.values(this.corpses).forEach(list => list.forEach(corp => {
            indexX = Math.floor((corp.x - this.x) / CELL.w);
            indexY = Math.floor((corp.y - this.y) / CELL.h);
            if (this.cells[indexX][indexY] && this.cells[indexX][indexY].active) corp.draw(this.corpseImages, context);
        }))
    }

    clearFrame(context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    hideCells() {
        this.cells.forEach(row => row.forEach(cell => {
            if (cell) {
                cell.active = false;
                cell.activeDirection = 1;
            }
        }));
    }

    getCorpses() {
        return this.corpses;
    }

    addCorpse(id, player) {
        const skinId = player.getSkinId();
        let {x, y} = player.getPosition();
        if (!this.corpses[id]) this.corpses[id] = [];
        this.corpses[id].push(new Corpse(x, y, skinId));
    }

    clearCorpses() {
        
    }

    move(dx, dy) {
        super.move(dx, dy);
        this.cells.forEach(row => row.forEach(cell => {if (cell) {cell.move(dx, dy)}}));
        this.verticalWalls.forEach(wall => wall.move(dx, dy));
        this.horizontalWalls.forEach(wall => wall.move(dx, dy));
        Object.values(this.weapons).forEach(weapon => weapon.model.move(dx, dy))
        this.ammunition.forEach(ammunition => ammunition.move(dx, dy));
        this.aidKits.forEach(aidKit => aidKit.move(dx, dy));
        Object.values(this.corpses).forEach(list => list.forEach(corp => corp.move(dx, dy)));
    }
}

export { Field } 