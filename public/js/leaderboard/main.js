const backButton = document.getElementById('goRoom');
const playersContainer = document.getElementById('player-list');
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id');

backButton.addEventListener('click', () => {
    window.location.href = `/room?id=${roomId}`;
});


async function updateBoard() {
    try {
        const playersResponse = await fetch(`/getPlayers?roomId=${roomId}`);
        const players = await playersResponse.json();

        const playerRows = []

        for (const player in players) {
            const playerRow = document.createElement('tr');
            playerRow.innerHTML = `
                <td>${players[player].player_name}</td>
                <td>${players[player].score}</td>
            `;
            playerRows.push(playerRow);
        }

        playersContainer.innerHTML = '';
        for (let row of playerRows) {
            playersContainer.appendChild(row);
        }
        

    } catch (error) {
        console.error('Ошибка при обновлении таблицы лидеров:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateBoard();
});