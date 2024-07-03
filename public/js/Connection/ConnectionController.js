import { SERVER } from "../CONST.js";

class ConnectionController {
    constructor() {
        // вебсокет у каждого свой... типа
        this.socket = new WebSocket(SERVER.sergey);
        this.initEventListeners();
    }

    sendPosition(x, y) {
        if (this.socket.readyState === WebSocket.OPEN) {
            const data = JSON.stringify({ x, y });
            this.socket.send(data);
        }
    }

    initEventListeners() {
        this.socket.addEventListener('open', ({ data }) => {
            console.log('Соединение установлено');
        });
    
        this.socket.addEventListener('message', ({ data }) => {
            const change = JSON.parse(data);
            console.log(change);
            //const {x, y} = this.player.getPosition();
            //this.player.model.x = change.x + this.field.x;
            //this.player.model.y = change.y + this.field.y;
        });
    
        this.socket.addEventListener('close', ({ data }) => {
            console.log('Соединение закрыто');
        });
    
        this.socket.addEventListener('error', (error) => {
            console.error('Ошибка WebSocket: ', error);
        });
    }
}

export { ConnectionController };
