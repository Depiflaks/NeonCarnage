import { SERVER } from "../../game/CONST.js";
import { Responder } from "./Responder/Responder.js";
import { Sender } from "./Sender/Sender.js";

export class ConnectionController {
    constructor(chat) {
        this.socket = new WebSocket(SERVER.sergey_home);
        this.sender = new Sender(this.socket);
        this.responder = new Responder(this.socket, chat);
        this.initEventListeners();
    }

    send(nick, text) {
        this.sender.sendMessage({nick: nick, text: text});
    }

    initEventListeners() {
        this.socket.addEventListener('open', ({ data }) => {this.onOpen(data)});
        this.socket.addEventListener('message', ({ data }) => {this.onMessage(JSON.parse(data));});
        this.socket.addEventListener('close', ({ data }) => {this.onClose(data)});
        this.socket.addEventListener('error', (error) => {this.onError(error)});
    }

    onOpen(data) {
        console.log('Соединение установлено');
    }

    onMessage(data) {
        const type = data.type;
        const body = data.body;
        switch (type) {
            case "init":
                this.responder.onInit(body);
                break;
            case "response":
                this.responder.onResponse(body);
                break;
        }
    }

    onClose() {
        console.log('Соединение закрыто');
    }

    onError(error) {
        console.error('Ошибка WebSocket: ', error);
    }

    close() {
        if (this.socket) this.socket.close();
    }
}