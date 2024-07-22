CREATE DATABASE NeonCarnage;

USE NeonCarnage;

SHOW TABLES;

CREATE TABLE lobby (
	lobby_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    owner_id INT UNSIGNED,
    game_mode VARCHAR(40),
    map_number INT UNSIGNED,
    is_started TINYINT default 0,
    address VARCHAR(40),
    time_creation DATETIME NOT NULL
);

CREATE TABLE player (
	player_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    lobby_id INT UNSIGNED,
    player_name VARCHAR(40) NOT NULL,
    socket_id VARCHAR(40),
    skin_id INT UNSIGNED,
    ready CHAR(1) NOT NULL,
    FOREIGN KEY (lobby_id) REFERENCES lobby (lobby_id)
);


DROP TABLE player;
DROP TABLE lobby;

show columns from lobby;

USE lobby;

SELECT * FROM player;

SELECT * FROM lobby;

INSERT INTO lobby (owner_id, game_mode, time_creation)
VALUES 
    (1, 'pizdelovo', '2023-10-28 19:30:35')
;

INSERT INTO player (lobby_id, player_name, ready)
VALUES 
    (1, 'ignat2', 'N')
;