import { ENTITY } from "../../CONST.js";

export class Sender {
    constructor(socket) {
        this.socket = socket;
    }

    sendData(player, field) {
        const {x, y} = player.getPosition();
        //console.log(player)
        //console.log(player.getChange())
        const body = {
            player: {
                x: x - field.x, 
                y: y - field.y, 
                angle: player.getAngle(), 
                health: player.getHealth(),
                maxHealth: ENTITY.maxHealth,
                skinId: player.getSkinId(),
                nickname: player.getNickname(),
                isReborning: player.isReborning(),
                meleeStrike: {
                    isAnimating: player.getIsAnimating(),
                    direction: player.getDirection(),
                    angle: player.getCurrentAngle(),
                },
                visibleBots: player.getVisibleBots(),
            },
            bullets: [],
            change: player.getChange(),
            field: {
                corpses: [],
            }
        }
        // Очищаем изменения
        player.clearChange();
        // Обновляем трупы
        if (field.getCorpses()[this.socket.id]) body.field.corpses = field.getCorpses()[this.socket.id].map(corp => {return {
            x: corp.x - field.x,
            y: corp.y - field.y,
            skinId: corp.skinId,
        }});
        // Обновляем пули
        body.bullets = player.getBullets().map(bullet => {
            const {x, y} = bullet.getPosition();
            return {
                x: x - field.x, 
                y: y - field.y, 
                angle: bullet.getAngle()
            };
        })
        //console.log(body.change.weapon);
        this.send("update", body);
    }

    send(type, body) {
        if (this.socket.readyState !== WebSocket.OPEN) return;
        const data = {
            type: type,
            body: body
        };
        this.socket.send(JSON.stringify(data));
    }
}