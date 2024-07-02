const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка Express для обслуживания статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для отправки файла game.html при запросе /
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/game/game.html'));
});

// Слушаем указанный порт и выводим сообщение о запуске сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
