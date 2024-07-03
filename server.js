const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Обслуживаем статические файлы из текущего каталога
app.use(express.static(path.join(__dirname)));

// Запускаем сервер на порту 8000
server.listen(8000, () => {
  console.log('Listening on port 8000');
});

const ws = new WebSocket.Server({ server });

ws.on('connection', (connection, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`Connected ${ip}`);
  connection.on('message', (message) => {
    console.log('Received: ' + message);
    for (const client of ws.clients) {
      if (client.readyState !== WebSocket.OPEN) continue;
      if (client === connection) continue;
      client.send(message, { binary: false });
    }
  });
  connection.on('close', () => {
    console.log(`Disconnected ${ip}`);
  });
});
