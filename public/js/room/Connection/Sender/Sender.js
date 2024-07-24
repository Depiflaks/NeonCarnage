export class Sender {
    constructor(socket) {
        this.socket = socket;
    }

    sendMessage(body) {
        this.send("chat", body);
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