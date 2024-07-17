import { ConnectionController } from "./Connection/ConnectionController.js";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('id');

    const selectElement = document.getElementById('player-skin');

    selectElement.addEventListener('change', (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const iconUrl = selectedOption.getAttribute('data-icon');
        event.target.style.backgroundImage = `url(${iconUrl})`;
    });

    // Инициализируем фон для первого элемента
    const firstOption = selectElement.options[selectElement.selectedIndex];
    selectElement.style.backgroundImage = `url(${firstOption.getAttribute('data-icon')})`;

    try {
        const response = await fetch(`/getPlayers?roomId=${roomId}`);
        const players = await response.json();

        const playersList = document.getElementById('playersList');
        players.forEach(player => {
            const row = document.createElement('tr');
            const statusColor = player.ready ? 'green' : 'red'; // Предполагаем, что 'ready' это свойство, указывающее статус
            row.innerHTML = `
                <td>${player.player_name}</td>
                <td><img src="skin.png" alt="Skin" width="30"></td>
                <td id="statusCell" style="color: ${statusColor};">${player.ready ? 'Ready' : 'Not Ready'}</td>
            `;
            playersList.appendChild(row);
        });

        // Обработчик клика по кнопке "Ready"
        const readyButton = document.getElementById('ready-button');
        readyButton.addEventListener('click', async () => {
            const currentStatus = document.getElementById('statusCell').textContent.trim();

            // Изменяем статус
            const newStatus = currentStatus === 'Ready' ? 'Not Ready' : 'Ready';
            document.getElementById('statusCell').textContent = newStatus;
            document.getElementById('statusCell').style.color = newStatus === 'Ready' ? 'green' : 'red';

            // Извлечение данных из localStorage
            let data = JSON.parse(localStorage.getItem('responseData'));

            // Изменение значения data.player.skinId
            data.player.skinId = document.getElementById('player-skin').value;

            // Сохранение изменённых данных обратно в localStorage
            localStorage.setItem('responseData', JSON.stringify(data));

            // Пример отправки обновленного статуса на сервер через сокет (предполагается, что у вас есть такая функциональность)
            // await socket.sendPlayerStatus(roomId, newStatus === 'Ready');
            window.location.href = `/game`;
        });
    } catch (error) {
        console.error('Ошибка загрузки списка игроков:', error);
    }
});

const urlParams = new URLSearchParams(window.location.search);
const lastInsertId = urlParams.get('id');
console.log('Last Insert ID:', lastInsertId);
const socket = new ConnectionController();
