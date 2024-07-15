CREATE DATABASE NeonCarnage;

USE NeonCarnage;

CREATE TABLE lobby (
	lobby_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    owner_name VARCHAR(40) NOT NULL,
    owner_id INT UNSIGNED NOT NULL,
    fullness INT UNSIGNED NOT NULL,
    player_name VARCHAR(40),
    game_mode VARCHAR(40) NOT NULL,
    time_creation DATETIME NOT NULL
);

USE lobby;

SELECT * FROM lobby;

INSERT INTO lobby (owner_name, owner_id, fullness, player_name, game_mode, time_creation)
VALUES 
    ('noname', 1, 1, '', 'pizdelovo', '2023-10-28 19:30:35')
;