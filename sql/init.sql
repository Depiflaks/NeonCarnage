CREATE DATABASE NeonCarnage;

USE NeonCarnage;

CREATE TABLE lobby (
	lobby_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    owner_id INT UNSIGNED NOT NULL,
    game_mode VARCHAR(40) NOT NULL,
    time_creation DATETIME NOT NULL
);

CREATE TABLE player (
	player_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    lobby_id INT UNSIGNED NOT NULL,
    player_name VARCHAR(40) NOT NULL,
    ready CHAR(1) NOT NULL,
    FOREIGN KEY (lobby_id) REFERENCES lobby (lobby_id)
);

INSERT INTO lobby (owner_id, game_mode, time_creation)
VALUES 
    (1, 'pizdelovo', '2023-10-28 19:30:35')
;

INSERT INTO player (lobby_id, player_name, ready)
VALUES 
    (1, 'ignat2', 'N')
;

GRANT ALL PRIVILEGES ON NeonCarnage.* TO 'smmm'@'localhost';