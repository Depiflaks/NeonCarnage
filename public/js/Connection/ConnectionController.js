class ConnectionController {
    constructor() {
        this.socket = new WebSocket('ws://localhost:8080');

        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');
        });

        this.socket.addEventListener('close', () => {
            console.log('Соединение закрыто');
        });

        this.socket.addEventListener('error', (error) => {
            console.error('Ошибка WebSocket: ', error);
        });
    }

    sendPosition(x, y) {
        if (this.socket.readyState === WebSocket.OPEN) {
            const data = JSON.stringify({ x, y });
            this.socket.send(data);
        }
    }
}

export { ConnectionController };
