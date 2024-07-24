export class Lobby {
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

    addLobby(ownerId, gameMode, mapNumber, address, timeCreation) {
        return this.makeQuery(
            "INSERT INTO lobby (owner_id, game_mode, map_number, address, time_creation) VALUES (?, ?, ?, ?, ?)",
            [ownerId, gameMode, mapNumber, address, timeCreation]
        );
    }

    async getLobbyById(lobbyId) {
        return (await this.makeQuery(
            "SELECT * FROM lobby WHERE lobby_id = ?",
            [lobbyId]
        ))[0];
    }

    deleteLobby(lobbyId) {
        return this.makeQuery(
            "DELETE FROM lobby WHERE lobby_id = ?",
            [lobbyId]
        );
    }

    updateLobbyParameter(lobbyId, parameter, value) {
        const query = `UPDATE lobby SET ${parameter} = ? WHERE lobby_id = ?`;
        return this.makeQuery(query, [value, lobbyId]);
    }

    getAllLobbies() {
        return this.makeQuery(
            "SELECT * FROM lobby"
        );
    }
}