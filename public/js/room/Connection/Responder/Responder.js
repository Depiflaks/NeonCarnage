export class Responder {
    constructor(socket, chat) {
        this.socket = socket;
        this.chat = chat;
    }

    onInit(body) {
        this.id = body.id;
        this.socket.id = this.id
    }

    onResponse(body) {
        this.chat.addMessage(body.nick, body.text);
    }
}