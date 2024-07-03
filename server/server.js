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

const wss = new WebSocket.Server({ server });

wss.getUniqueID = function () {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

wss.on('connection', (connection, req) => {
  const ip = req.socket.remoteAddress;
  connection.id = wss.getUniqueID()
  console.log(`Connected ${ip}`);
  connection.on('message', (message) => {
    //console.log('Received: ' + message);
    const {x, y} = JSON.parse(message);
    for (const client of wss.clients) {
      if (client.readyState !== WebSocket.OPEN) continue;
      if (client === connection) continue;
      id = connection.id;
      client.send(JSON.stringify({id, x, y}), { binary: false });
    }
  });
  connection.on('close', () => {
    console.log(`Disconnected ${ip}`);
  });
});
