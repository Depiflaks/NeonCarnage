const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');


const app = express();

const server = http.createServer(app);

const PORT = 8000;


app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/game/game.html'));
});

// Запускаем сервер на порту 8000
server.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
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