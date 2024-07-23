const updateButton = document.getElementById('updateButton');
const createButton = document.getElementById('createButton');
const roomsContainer = document.getElementById('roomsContainer');
const id = localStorage.getItem("playerId")
console.log(id);

// Запрос на /leaveLobby при загрузке страницы
async function leaveLobby() {
    try {
        await fetch('/leaveLobby', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerId: id }) // Замените YOUR_PLAYER_ID на фактический ID игрока
        });
    } catch (error) {
        console.error('Ошибка при выходе из лобби:', error);
    }
}

// Обновление таблицы с комнатами
async function updateRooms() {
    try {
        // Получение списка всех лобби
        const response = await fetch('/getAllLobbies', { method: 'POST' });
        const rooms = await response.json();
        
        const roomRows = []

        for (const room of rooms) {
            if (room.is_started) continue;
            // Получение списка игроков в комнате
            const playersResponse = await fetch(`/getPlayers?roomId=${room.lobby_id}`);
            const players = await playersResponse.json();

            const ownerId = room.owner_id;
            const owner = players.find(player => player.player_id === ownerId);
            const ownerName = owner ? owner.player_name : 'Unknown';

            // Добавление строки с информацией о комнате
            const roomRow = document.createElement('tr');
            const count = players.length;
            roomRow.innerHTML = `
                <td>${ownerName}</td>
                <td>${count} / 4</td>
                <td>${room.game_mode}</td>
                <td>
                    <button class="joinButton" data-room-id="${room.lobby_id}" ${count >= 4 ? 'disabled' : ''}>Join Room</button>
                </td>
            `;
            roomRows.push(roomRow);
        }
        roomsContainer.innerHTML = '';
        for (let row of roomRows) {
            roomsContainer.appendChild(row);
        }

        // Добавление обработчиков событий для кнопок Join Room
        document.querySelectorAll('.joinButton').forEach(button => {
            button.addEventListener('click', async () => {
                const roomId = button.getAttribute('data-room-id');
                await joinLobby(roomId);
            });
        });
    } catch (error) {
        console.error('Ошибка при обновлении списка комнат:', error);
    }
}

// Запрос на /joinLobby
async function joinLobby(roomId) {
    try {
        //console.log(roomId, id);
        await fetch('/joinLobby', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerId: id,
                lobbyId: roomId
            })
        });
        window.location.href = `/room?id=${roomId}`;
    } catch (error) {
        console.error('Ошибка при входе в лобби:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const track = new Audio("../../../public/sound/Jasper Byrne - Voyager.mp3");
    track.loop = false;
    track.volume = 1.0;
    track.play();
    
    // Запрос на /createLobby
    createButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/createLobby', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ownerId: id })
            });
            const { lobbyId } = await response.json();
            window.location.href = `/room?id=${lobbyId}`;
        } catch (error) {
            console.error('Ошибка при создании лобби:', error);
        }
    });

    // Инициализация
    leaveLobby(); // Выполнить запрос при загрузке страницы
    updateButton.addEventListener('click', async () => {
        await updateRooms();
    }); // Обновление списка комнат при нажатии на кнопку
    setInterval(async () => {
        await updateRooms();
    }, 1000);
});