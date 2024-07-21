updateLobby();

document.getElementById('updateButton').addEventListener('click', updateLobby);

function updateLobby() {
    fetch('/updateLobby', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        const roomsContainer = document.getElementById('roomsContainer');
        roomsContainer.innerHTML = '';
        data.forEach(room => {
            const roomRow = document.createElement('tr');
            roomRow.innerHTML = `
                <td>${room.ownerName}</td>
                <td>${room.fullness} / 4</td>
                <td>${room.gameMode}</td>
                <td><button class="joinButton" data-room-id="${room.id}">Join Room</button></td>
            `;
            roomsContainer.appendChild(roomRow);
        });

        document.querySelectorAll('.joinButton').forEach(button => {
            button.addEventListener('click', () => {
                const roomId = button.getAttribute('data-room-id');
                window.location.href = `/room?id=${roomId}`;
            });
        });
    })
    .catch(error => console.error('Error:', error));
}


document.getElementById('createButton').addEventListener('click', () => {
    const data = JSON.parse(localStorage.getItem("responseData"));
    console.log(data.player.nickName);
    window.location.href = `/createRoom`;
});

setInterval(() => {
    updateLobby();
}, 1000);