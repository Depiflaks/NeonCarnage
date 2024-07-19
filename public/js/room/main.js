import { ConnectionController } from "./Connection/ConnectionController.js";

const connection = new ConnectionController(updatePlayersList);

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

    const data = JSON.parse(localStorage.getItem('responseData'));
    const playerNickname = data.player.nickName;

    try {
        const playerResponse = await fetch(`/setPlayer?roomId=${roomId}&nickname=${playerNickname}`);
        const playerId = await playerResponse.json();

        const response = await fetch('/getRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: roomId })
        });

        const responseData = await response.json();
        if(responseData[0].owner_id == 1) {
            const ownerId = playerId;
            const ownerResponse = await fetch(`/setRoomOwner?roomId=${roomId}&ownerId=${ownerId}`);
            await updatePlayersList();
        }
        console.log(responseData);

        connection.send("updateRoom", {id: connection.id, playerId: playerId});

        // Сохраняем playerId в локальное хранилище
        data.player.id = playerId;
        localStorage.setItem('responseData', JSON.stringify(data));

        // Функция для обновления списка игроков
        async function updatePlayersList() {
            const response = await fetch(`/getPlayers?roomId=${roomId}`);
            const players = await response.json();

            const playersList = document.getElementById('playersList');
            playersList.innerHTML = ''; // Очистить текущий список

            players.forEach(player => {
                const row = document.createElement('tr');
                const statusColor = 'red';
                row.innerHTML = `
                    <td data-player-id="${player.player_id}">${player.player_name}</td>
                    <td data-player-id="${player.player_id}" class="statusCell" style="color: ${statusColor};">${player.ready ? 'Ready' : 'Not Ready'}</td>
                `;
                playersList.appendChild(row);
            });
        }

        // Обработчик клика по кнопке "Ready"
        const readyButton = document.getElementById('ready-button');
        readyButton.addEventListener('click', () => {
            // Извлечение данных из localStorage
            let data = JSON.parse(localStorage.getItem('responseData'));

            // Изменение значения data.player.skinId
            data.player.skinId = document.getElementById('player-skin').value;

            // Сохранение изменённых данных обратно в localStorage
            localStorage.setItem('responseData', JSON.stringify(data));
            connection.send("updateRoom", {id: connection.id, playerId: playerId});
        });

        // Изначальная загрузка списка игроков
        await updatePlayersList();

        // setInterval(async () => {
        //     await updatePlayersList();
        //     connection.send("getRoomStatus", {});
        // }, 500);

    } catch (error) {
        console.error('Ошибка загрузки списка игроков:', error);
    }
});

document.addEventListener('beforeunload', function(event) {
    connection.close();
});