const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
    console.log('Новое подключение');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(`Получены данные: x=${data.x}, y=${data.y}`);
        // Здесь можно добавить обработку полученных данных
    });

    ws.on('close', () => {
        console.log('Соединение закрыто');
    });

    ws.on('error', (error) => {
        console.error('Ошибка WebSocket: ', error);
    });
});

console.log('WebSocket сервер запущен на ws://localhost:8080');
