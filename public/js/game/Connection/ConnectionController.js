import { SERVER } from "../CONST.js";
import { Responder } from "./Responder/Responder.js";
import { Sender } from "./Sender/Sender.js";

class ConnectionController {
    constructor(address) {
        // вебсокет у каждого свой... типа
        this.socket = new WebSocket(address);
        this.enemies = {};
        
        this.sender = new Sender(this.socket);
        this.initEventListeners();
    }

    initResponder(engine) {
        this.responder = new Responder(engine, this.socket);
    }

    send(player, field) {
        this.sender.sendData(player, field);
    }

    initEventListeners() {
        this.socket.addEventListener('open', ({ data }) => {this.onOpen()});
    
        this.socket.addEventListener('message', ({ data }) => {this.onMessage(JSON.parse(data))});

        this.socket.addEventListener('close', ({ data }) => {this.onClose(data)});

        this.socket.addEventListener('error', (error) => {this.onError(error)});
    }

    onOpen() {
        console.log('Соединение установлено');
    }

    onMessage(data) {
        const type = data.type;
        const body = data.body;
        switch (type) {
            case "init":
                this.responder.onInit(body)
                break;
            case "response":
                this.responder.onResponse(body);
                break
            default:
                break;
        }
    }

    onClose(data) {
        console.log('Соединение закрыто');
    }

    onError(error) {
        console.error('Ошибка WebSocket: ', error);
    }

}

export { ConnectionController };