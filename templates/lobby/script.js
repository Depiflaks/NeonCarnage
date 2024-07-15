const rooms = [];

function createRoom() {
    const roomName = "room name";
    const creatorName = "creator name";
    const gameMode = "game mode";

    if (roomName && creatorName) {
        const newRoom = {
            roomName,
            creatorName,
            players: 1,
            gameMode
        };

        rooms.push(newRoom);
        updateRoomList();
    } else {
        alert('Please enter both room name and creator name.');
    }
}

function joinRoom(roomName) {
    const room = rooms.find(r => r.roomName === roomName);
    if (room && room.players < 4) {
        room.players += 1;
        updateRoomList();
    } else {
        alert('Room is full or does not exist.');
    }
}

function updateRoomList() {
    const roomsContainer = document.getElementById('roomsContainer');
    roomsContainer.innerHTML = '';

    rooms.forEach(room => {
        const roomRow = document.createElement('tr');
        roomRow.innerHTML = `
            <td>${room.roomName}</td>
            <td>${room.creatorName}</td>
            <td>${room.players} / 4</td>
            <td>${room.gameMode}</td>
            <td><button onclick="joinRoom('${room.roomName}')">Join Room</button></td>
        `;
        roomsContainer.appendChild(roomRow);
    });
}