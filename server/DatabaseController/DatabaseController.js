import mysql from 'mysql2';

class DatabaseController {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "NeonCarnage",
            password: "1111"
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
            this.connection.query("INSERT INTO lobby (owner_name, owner_id, fullness, player_name, game_mode, time_creation) VALUES ('', 0, 0, '', '', '2002-01-00 00:00:00')", function(err, data) {
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
