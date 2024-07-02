class ConnectionController {
    constructor() {
        this.socket = new WebSocket('wss://localhost:8080'); // либо путь к точке входа (хз)

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
