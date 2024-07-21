export class PlayerList {
    constructor() {
        this.list = document.getElementById('playersList');
        
    }

    update(players) {
        this.list.innerHTML = '';
        for (let player of players) {
            this.addLine(player)
        }
    }

    addLine(player) {
        const row = document.createElement('tr');
        const isReady = player.ready === 'Y';
        const statusColor = isReady ? 'green' : 'red';
        const statusText = isReady ? 'Ready' : 'Not Ready';
        row.innerHTML = `
            <td data-player-id="${player.player_id}">${player.player_name}</td>
            <td data-player-id="${player.player_id}" class="statusCell" style="color: ${statusColor};">${statusText}</td>
        `;
        this.list.appendChild(row);
    }
}