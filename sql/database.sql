CREATE DATABASE NeonCarnage;

USE NeonCarnage;

SHOW TABLES;

CREATE TABLE lobby (
	lobby_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    owner_id INT UNSIGNED,
    game_mode VARCHAR(40),
    map_number INT UNSIGNED,
    is_started TINYINT default 0,
    max_players INT UNSIGNED default 4,
    address VARCHAR(40),
    time_creation DATETIME NOT NULL
);

CREATE TABLE player (
  player_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    lobby_id INT UNSIGNED,
    player_name VARCHAR(40) NOT NULL,
    socket_id VARCHAR(40),
    skin_id INT UNSIGNED,
    ready TINYINT default 0,
    is_owner TINYINT default 0,
    score INT UNSIGNED default 0,
    FOREIGN KEY (lobby_id) REFERENCES lobby (lobby_id)
);


DROP TABLE player;
DROP TABLE lobby;

show columns from lobby;

SELECT * FROM player;

SELECT * FROM lobby;
