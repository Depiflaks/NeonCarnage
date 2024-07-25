const backButton = document.getElementById('goLobby');
const playersContainer = document.getElementById('player-list');
const urlParams = new URLSearchParams(window.location.search);

backButton.addEventListener('click', () => {
    window.location.href = `/lobby`;
});


function updateBoard() {
    try {
        const players = JSON.parse(localStorage.getItem('leaders'));

        const playersArray = Object.values(players);

        playersArray.sort((a, b) => b.score - a.score);

        const playerRows = [];

        for (const player of playersArray) {
            const playerRow = document.createElement('tr');
            playerRow.innerHTML = `
                <td>${player.name}</td>
                <td>${player.score}</td>
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