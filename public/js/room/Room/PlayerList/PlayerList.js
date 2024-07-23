export class PlayerList {
    constructor(playerId) {
        this.list = document.getElementById('playersList');
        this.playerId = playerId;
    }

    update(players, ownerId) {
        this.list.innerHTML = '';
        for (let player of players) {
            this.addLine(player)
        }
        if (ownerId == this.playerId) {
            const cells = document.querySelectorAll('.statusCell');
            for (let cell of cells) {
                if (!cell) continue;
                const id = cell.getAttribute('player-id');
                if (id == this.playerId) continue;
                const originalContent = cell.innerHTML;
                
                cell.addEventListener('mouseenter', () => {
                    cell.innerHTML = `<a href="#">Kick</a>`;
                    cell.querySelector('a').addEventListener('click', async () => {
                        await fetch('/removePlayer', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                ownerId: ownerId, 
                                playerIdToRemove: id,
                            })
                        });
                    });
                });

                cell.addEventListener('mouseleave', () => {
                    cell.innerHTML = originalContent;
                });
            }
        }
    }

    addLine(player) {
        const row = document.createElement('tr');
        const isReady = player.ready;
        const statusColor = isReady ? 'green' : 'red';
        const statusText = isReady ? 'Ready' : 'Not Ready';
        const isOwnerText = player.is_owner ? " (host)" : "";
        const isMe = player.player_id == this.playerId ? 'style="color: lightgreen;"' : ''
        row.innerHTML = `
            <td player-id="${player.player_id}" ${isMe}>${player.player_name + isOwnerText}</td>
            <td player-id="${player.player_id}" class="statusCell" style="color: ${statusColor};">${statusText}</td>
        `;
        
        this.list.appendChild(row);
    }
}