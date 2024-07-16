
document.getElementById('updateButton').addEventListener('click', () => {
    fetch('/updateLobby', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {}
    })
    .then(response => response.json())
    .then(data => {
        const roomsContainer = document.getElementById('roomsContainer');
        roomsContainer.innerHTML = '';

        data.forEach(room => {
            const roomRow = document.createElement('tr');
            roomRow.innerHTML = `
                <td>${room.owner_name}</td>
                <td>${room.fullness} / 4</td>
                <td>${room.game_mode}</td>
                <td><button onclick="">Join Room</button></td>
            `;
            roomsContainer.appendChild(roomRow);
        });
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('createButton').addEventListener('click', () => {
    const data = JSON.parse(localStorage.getItem("responseData"));
    console.log(data.player.nickName);
    window.location.href = `/createRoom`;
});