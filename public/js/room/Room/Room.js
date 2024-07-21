import { Chat } from "./Chat/Chat.js";
import { ConnectionController } from "../Connection/ConnectionController.js";

export class Room {
    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        this.id = urlParams.get('id');

        this.chat = new Chat();
        this.skin = document.getElementById('player-skin');
        this.connection = new ConnectionController(this.chat);
        this.data = JSON.parse(localStorage.getItem('responseData'));
        this.initEventListeners();
    }

    initEventListeners() {
        addEventListener("keydown", (event) => {
            this.onKeyDown(event)
        });

        addEventListener('DOMContentLoaded', async () => {
            this.onPageLoad()
        });

        this.skin.addEventListener('change', (event) => {
            this.onSkinChange(event);
        });
    }

    async onPageLoad() {
        
    }

    onKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            this.connection.send(this.data.player.nickName, this.chat.getInput());
            this.chat.clearInput();
        }
    }

    onSkinChange(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const iconUrl = selectedOption.getAttribute('data-icon');
        event.target.style.backgroundImage = `url(${iconUrl})`;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const selectElement = document.getElementById('player-skin');

    // Инициализируем фон для первого элемента
    const firstOption = selectElement.options[selectElement.selectedIndex];
    selectElement.style.backgroundImage = `url(${firstOption.getAttribute('data-icon')})`;

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

        // Сохраняем playerId в локальное хранилище
        data.player.id = playerId;
        localStorage.setItem('responseData', JSON.stringify(data));

        // Функция для обновления списка игроков  
        //TODO: помять оборажение ready
        async function updatePlayersList() {
            const response = await fetch(`/getPlayers?roomId=${roomId}`);
            const players = await response.json();
        
            const playersList = document.getElementById('playersList');
            playersList.innerHTML = ''; // Очистить текущий список
        
            players.forEach(player => {
                const row = document.createElement('tr');
                const isReady = player.ready === 'Y';
                const statusColor = isReady ? 'green' : 'red';
                const statusText = isReady ? 'Ready' : 'Not Ready';
                row.innerHTML = `
                    <td data-player-id="${player.player_id}">${player.player_name}</td>
                    <td data-player-id="${player.player_id}" class="statusCell" style="color: ${statusColor};">${statusText}</td>
                `;
                playersList.appendChild(row);
            });
        }
        

        // Обработчик клика по кнопке "Ready"
        const readyButton = document.getElementById('ready-button');
        readyButton.addEventListener('click', async () => {
            // Извлечение данных из localStorage
            let data = JSON.parse(localStorage.getItem('responseData'));

            // Изменение значения data.player.skinId
            data.player.skinId = document.getElementById('player-skin').value;

            // Сохранение изменённых данных обратно в localStorage
            localStorage.setItem('responseData', JSON.stringify(data));
            
            const playerResponse = await fetch(`/getPlayer?playerId=${playerId}`);
            const player = await playerResponse.json();
            if(player[0].ready == 'N') {
                player[0].ready = 'Y';
            } else {
                player[0].ready = 'N';
            }
            const readyResponse = await fetch(`/setPlayerState?playerId=${playerId}&ready=${player[0].ready}`);
            // connection.send("updateRoom", {id: connection.id, playerId: playerId}); 
            //TODO: запрос на изменение в бд
        });

        // Изначальная загрузка списка игроков
        await updatePlayersList();

        setInterval(async () => {
            await updatePlayersList();
        }, 1000);

    } catch (error) {
        console.error('Ошибка загрузки списка игроков:', error);
    }
});