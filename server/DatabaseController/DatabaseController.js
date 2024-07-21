import mysql from 'mysql2';
import { DATA_BASE } from '../CONST/SERVER/SERVER.js';

class DatabaseController {
    constructor() {
        this.connection = mysql.createConnection(DATA_BASE.sergey);

        this.connection.connect((err) => {
            if (err) return console.error("Ошибка: " + err.message);
            console.log("Подключение к серверу MySQL успешно установлено");
        });
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

    getRoomId() {
        return this.makeQuery(
            "INSERT INTO lobby (owner_id, game_mode, time_creation) VALUES (0, '', '2023-10-28 19:30:35')"
        );
    }

    getRoom(id) {
        return this.makeQuery(
            "SELECT * FROM lobby WHERE lobby_id=?", 
            [id]
        );
    }

    setRoom(ownerId, gameMode, timeCreation) {
        return this.makeQuery(
            "INSERT INTO lobby (owner_id, game_mode, time_creation) VALUES (?, ?, ?)", 
            [ownerId, gameMode, timeCreation]
        )
    }

    setPlayer(roomId, nickname) {
        return this.makeQuery(
            "INSERT INTO player (lobby_id, player_name, ready) VALUES (?, ?, 'N')", 
            [roomId, nickname]
        )
    }

    setRoomOwner(roomId, ownerId) {
        return this.makeQuery(
            "UPDATE lobby SET owner_id=? WHERE lobby_id=?", 
            [roomId, roomId]
        )
    }
    
    getAllFromLobby() {
        return this.makeQuery(
            "SELECT * FROM lobby", 
        )
    }

    getPlayers(lobbyId) {
        return this.makeQuery(
            "SELECT * FROM player WHERE lobby_id=?", 
            [lobbyId]
        )
    }

    getPlayer(playerId) {
        return this.makeQuery(
            "SELECT * FROM player WHERE player_id=?", 
            [playerId]
        )
    } 

    updatePlayerState(playerId, state) {
        return this.makeQuery(
            "UPDATE player SET ready=? WHERE player_id=?", 
            [state, playerId]
        )
    }

    closeConnection() {
        this.connection.end(function(err) {
            if (err) return console.log("Ошибка: " + err.message);
            console.log("Подключение закрыто");
        });
    }
}

export {DatabaseController}
