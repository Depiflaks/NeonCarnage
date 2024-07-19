import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { DatabaseController } from '../DatabaseController/DatabaseController.js';

class RequestController {
    constructor(app, generator) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.connection = new DatabaseController();
        this.app = app;
        this.generator = generator;

        this.app.use('/public', express.static(path.join(__dirname, '../../public')));

        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/main/main.html'));
        });

        this.app.get('/lobby', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/lobby/main.html'));
        });

        this.app.post('/updateLobby', async (req, res) => {
            try {
                const lobbies = await this.connection.getAllFromLobby();
                const result = await Promise.all(lobbies.map(async (lobby) => {
                    const playersData = await this.connection.getPlayers(lobby.lobby_id);
                    const ownerData = await this.connection.getPlayer(lobby.owner_id);
                    return {
                        id: lobby.lobby_id,
                        ownerName: ownerData[0].player_name,
                        fullness: playersData.length,
                        gameMode: lobby.game_mode
                    };
                }));
                res.json(result);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.get('/game', (req, res) => {

            res.sendFile(path.join(__dirname, '../../templates/game/game.html'));
        });

        this.app.post('/create', (req, res) => {
            const responseData = this.generator.create();
            res.json(responseData);
        });

        this.app.get('/createRoom', async (req, res) => {
            try {
                const ownerId = 1;
                const gameMode = "game";
                const timeCreation = new Date().toISOString().slice(0, 19).replace('T', ' ');
                const responseData = await this.connection.setRoom(ownerId, gameMode, timeCreation);
                const lastInsertId = responseData.insertId;
                res.redirect(`/room?id=${lastInsertId}`);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.get('/room', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/room/main.html'));
        });

        this.app.post('/getRoom', async (req, res) => {
            try {
                const { id } = req.body;
                
                const responseData = await this.connection.getRoom(id);
                res.json(responseData);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });


        this.app.get('/getPlayers', async (req, res) => {
            const roomId = req.query.roomId;
            try {
                const players = await this.connection.getPlayers(roomId);
                res.json(players);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.get('/setPlayer', async (req, res) => {
            const roomId = req.query.roomId;
            const nickname = req.query.nickname;
            try {
                const player = await this.connection.setPlayer(roomId, nickname);
                const playerId = player.insertId;
                res.json(playerId);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.get('/getPlayer', async (req, res) => {
            const playerId = req.query.playerId;
            try {
                const player = await this.connection.getPlayer(playerId);
                res.json(player);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.get('/setPlayerState', async (req, res) => {
            const playerId = req.query.playerId;
            const ready = req.query.ready;
            try {

                const response = await this.connection.updatePlayerState(playerId, ready);
                const responseId = response.insertId;
                res.json(responseId);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.get('/setRoomOwner', async (req, res) => {
            const ownerId = req.query.ownerId;
            const roomId = req.query.roomId;
            try {
                const response = await this.connection.setRoomOwner(roomId, ownerId);
                const responseId = response.insertId;
                res.json(responseId);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });
    }
}

export { RequestController };
