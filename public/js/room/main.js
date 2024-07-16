import { ConnectionController } from "./Connection/ConnectionController.js";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('lastInsertId');

    try {
        const response = await fetch(`/getPlayers?roomId=${roomId}`);
        const players = await response.json();

        const playersList = document.getElementById('playersList');
        players.forEach(player => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player.player_name}</td>
                <td><img src="skin.png" alt="Skin" width="30"></td>
                <td style="color: green;">Ready</td>
            `;
            playersList.appendChild(row);
        });
    } catch (error) {
        console.error('Ошибка загрузки списка игроков:', error);
    }
});

const urlParams = new URLSearchParams(window.location.search);
const lastInsertId = urlParams.get('lastInsertId');
console.log('Last Insert ID:', lastInsertId);
const socket = new ConnectionController();