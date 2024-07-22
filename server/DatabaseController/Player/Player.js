export class Player {
    constructor(connection) {
        this.connection = connection;
    }

    makeQuery(query, parameters=[]) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                query, 
                parameters,
                (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    }

    addPlayer(playerName, ready) {
        return this.makeQuery(
            "INSERT INTO player (player_name, ready) VALUES (?, ?)",
            [playerName, ready]
        );
    }

    removePlayer(playerId) {
        return this.makeQuery(
            "DELETE FROM player WHERE player_id = ?",
            [playerId]
        );
    }

    updatePlayerParameter(playerId, parameter, value) {
        const query = `UPDATE player SET ${parameter} = ? WHERE player_id = ?`;
        return this.makeQuery(query, [value, playerId]);
    }

    getPlayerById(playerId) {
        return this.makeQuery(
            "SELECT * FROM player WHERE player_id = ?",
            [playerId]
        );
    }

    getPlayersByRoomId(lobbyId) {
        return this.makeQuery(
            "SELECT * FROM player WHERE lobby_id = ?",
            [lobbyId]
        );
    }

    getAllPlayers() {
        return this.makeQuery(
            "SELECT * FROM player"
        );
    }
    
}