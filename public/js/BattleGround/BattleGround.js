import { Cell } from "./Cell.js";
import { VerticalWall} from "./VerticalWall.js";
import { HorisontalWall} from "./HorisontalWall.js";
import { WINDOW } from "../settings.js";
import { WeaponController } from "../Weapon/WeaponController.js";

class BattleGround {
    constructor(groundList, wallList, weaponSet) {
        this.cells = [];
        this.walls = [];
        this.weapons = [];

        weaponSet.map(
            weapon => {
                this.weapons.push(new WeaponController(weapon));
            }
        );

        groundList.map(
            cell => {
                const [x, y] = cell;
                this.cells.push(new Cell(x, y)); 
            }
        );

        wallList.map(
            wall => {
                const [startX, startY, endX, endY] = wall;
                if (startX === endX) {
                    this.walls.push(new VerticalWall(startX, startY, endX, endY));
                } else if (startY === endY){
                        this.walls.push(new HorisontalWall(startX, startY, endX, endY));
                    }
                } 
        )

    };

    /**
     * 
     * @param {canvas} context отрисовка канвас 2d 
     */
    drawGround(context) {
        this.cells.map(cell => cell.draw(context));
    }

    /**
     * 
     * @param {canvas} context отрисовка канвас 2d 
     */
    drawWalls(context) {
        this.walls.map(wall => wall.draw(context));
    }

    /**
     * 
     * @param {object} player модель игрока
     * @param {canvas} context отрисовка канвас 2d  
     */
    drawWeapons(player, context){
        this.weapons.map(weapon => weapon.view.draw(
            {
                x: weapon.model.x, 
                y: weapon.model.y,
                status: weapon.model.status,
                onGround: weapon.model.onGround,
                inHand: weapon.model.inHand
            }, 
            player, 
            context
        ));
    }

    /**
     * 
     * @param {canvas} context отрисовка канвас 2d 
     */
    clearFrame(context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, WINDOW.w, WINDOW.h);
    }


    /**
     * 
     * @param {number} dx перемещение по х
     * @param {number} dy перемещение по у
     */
    move(dx, dy) {
        this.cells.map(cell => cell.move(dx, dy));
        this.walls.map(wall => wall.move(dx, dy));
        this.weapons.map(weapon => weapon.model.move(dx, dy));
    }
}

export { BattleGround } 