import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { DatabaseController } from '../DatabaseController/DatabaseController.js';

class RequestController {
    constructor(app, creature) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.connection = new DatabaseController();
        this.app = app;
        this.creature = creature;

        this.app.use('/public', express.static(path.join(__dirname, '../../public')));

        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/main/main.html'));
        });

        this.app.get('/lobby', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/lobby/main.html'));
        });

        this.app.get('/game', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/game/game.html'));
        });

        this.app.get('/room', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/room/main.html'));
        });

        app.post('/create', (req, res) => {
            console.log('Create new Session');

            const responseData = this.creature.create();
            
            res.json(responseData);
        });

        this.app.post('/enterLobby', async (req, res) => {
            try {
                const { lobbyId, playerName, socketId, skinId } = req.body;
                const existingPlayer = await this.connection.getPlayerByName(playerName);

                if (existingPlayer) {
                    res.json({ playerId: existingPlayer.player_id });
                } else {
                    const playerId = await this.connection.addPlayer(lobbyId, playerName, socketId, skinId);
                    res.json({ playerId });
                }
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        // Создание лобби
        this.app.post('/createLobby', async (req, res) => {
            try {
                const { ownerId } = req.body;
                const lobbyId = await this.connection.createLobby(ownerId);
                res.json({ lobbyId });
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        // новый игрок
        this.app.post('/createPlayer', async (req, res) => {
            try {
                const { playerName } = req.body;
                const players = await this.connection.getAllPlayers();
                let playerId = -1;
                for (let player of players) {
                    if (player.player_name === playerName) {
                        playerId = player.player_id;
                        break;
                    }
                }
                if (playerId === -1) {
                    playerId = await this.connection.addPlayer(playerName);
                }
                res.json({ playerId });
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        // Обновление параметров игрока
        this.app.post('/updatePlayer', async (req, res) => {
            try {
                const { playerId, skinId, ready } = req.body;
                const parameters = {
                    skin_id: skinId, 
                    ready: ready,
                };
                await this.connection.updatePlayer(playerId, parameters);
                res.send('Player updated successfully');
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        // Получение списка всех игроков в комнате
        this.app.get('/getPlayers', async (req, res) => {
            const roomId = req.query.roomId;
            try {
                const players = await this.connection.getPlayersByLobbyId(roomId);
                res.json(players);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.get('/getPlayer', async (req, res) => {
            const playerId = req.query.playerId;
            try {
                const player = await this.connection.player.getPlayerById(playerId);
                res.json(player);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        // Получение параметров комнаты по id
        this.app.get('/getRoom', async (req, res) => {
            try {
                const { roomId } = req.query;
                const responseData = await this.connection.lobby.getLobbyById(roomId);
                res.json(responseData);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        // Обновление параметров комнаты
        this.app.post('/updateLobby', async (req, res) => {
            try {
                const { playerId, lobbyId, parameters } = req.body;
                const isHost = await this.connection.isPlayerHost(playerId, lobbyId);
                if (isHost) {
                    await this.connection.updateLobby(lobbyId, parameters);
                    res.send('Lobby updated successfully');
                } else {
                    res.status(403).send('Only the host can update lobby parameters');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        // Игрок выходит из лобби
        this.app.post('/leaveLobby', async (req, res) => {
            try {
                const { playerId } = req.body;
                await this.connection.removePlayerFromLobby(playerId);
                res.send('Player removed from lobby');
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        // Owner удаляет игрока из комнаты
        this.app.post('/removePlayer', async (req, res) => {
            try {
                const { ownerId, playerIdToRemove } = req.body;
                await this.connection.ownerRemovePlayerFromLobby(ownerId, playerIdToRemove);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        // Начало игры
        this.app.post('/startGame', async (req, res) => {
            try {
                const { lobbyId } = req.body;
                const players = await this.connection.getPlayersByLobbyId(lobbyId);
                const allReady = players.every(player => player.ready === 'Y');

                if (allReady) {
                    await this.connection.updateLobby(lobbyId, { is_started: 1 });
                    res.redirect(`/game?id=${lobbyId}`);
                } else {
                    res.status(400).send('Not all players are ready');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.post('/getAllPlayers', async (req, res) => {
            try {
                const players = await this.connection.getAllPlayers();
                res.json(players);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        // 11. Получение списка всех лобби
        this.app.post('/getAllLobbies', async (req, res) => {
            try {
                const lobbies = await this.connection.getAllLobbies();
                res.json(lobbies);
                //console.log(lobbies);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.post('/joinLobby', async (req, res) => {
            try {
                const { playerId, lobbyId } = req.body;
        
                const players = await this.connection.getPlayersByLobbyId(lobbyId);
        
                if (players.length < 4) {
                    await this.connection.updatePlayer(playerId, { "lobby_id": lobbyId });
                    res.json(lobbyId);
                } else {
                    res.status(400).send('Комната заполнена');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });
    }
}

export { RequestController };
