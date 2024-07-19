import mysql from 'mysql2';

class DatabaseController {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "smmm",
            database: "NeonCarnage",
            password: "3030"
        });

        this.connection.connect(function(err){
            if (err) {
            return console.error("Ошибка: " + err.message);
            }
            else{
            console.log("Подключение к серверу MySQL успешно установлено");
            }
        });
    }

    getRoomId() {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO lobby (owner_id, game_mode, time_creation) VALUES (0, '', '2023-10-28 19:30:35')", function(err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    getRoom(id) {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM lobby WHERE lobby_id=?", [id], function(err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    setRoom(ownerId, gameMode, timeCreation) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO lobby (owner_id, game_mode, time_creation) VALUES (?, ?, ?)", [ownerId, gameMode, timeCreation], function(err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    setPlayer(roomId, nickname) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO player (lobby_id, player_name, ready) VALUES (?, ?, 'N')", [roomId, nickname], function(err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    setRoomOwner(roomId, ownerId) {
        return new Promise((resolve, reject) => {
            this.connection.query("UPDATE lobby SET owner_id=? WHERE lobby_id=?", [ownerId, roomId], function(err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
    getAllFromLobby() {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM lobby", function(err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    getPlayers(lobbyId) {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM player WHERE lobby_id=?", [lobbyId], function(err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    getPlayer(playerId) {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM player WHERE player_id=?", [playerId], function(err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    } 

    updatePlayerState(playerId, state) {
        return new Promise((resolve, reject) => {
            this.connection.query("UPDATE player SET ready=? WHERE player_id=?", [state, playerId], function(err, data) {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }


    closeConnection() {
        this.connection.end(function(err) {
            if (err) {
                return console.log("Ошибка: " + err.message);
            }
            console.log("Подключение закрыто");
            });
    }
}

export {DatabaseController}
