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
            // this.connection.closeConnection();
            res.sendFile(path.join(__dirname, '../../templates/game/game.html'));
        });

        this.app.post('/create', (req, res) => {
            console.log('Create new Session');

            const responseData = this.generator.create();
            
            res.json(responseData);
        });

        this.app.get('/createRoom', async (req, res) => {
            try {
                const ownerId = 1;
                const gameMode = "gameMode";
                const timeCreation = new Date().toISOString().slice(0, 19).replace('T', ' ');
                const responseData = await this.connection.setRoom(ownerId, gameMode, timeCreation)
                const lastInsertId = responseData.insertId;
                console.log(lastInsertId);
                res.redirect(`/room?id=${lastInsertId}`);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });
        

        this.app.get('/room', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/room/main.html'));
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
    }
}

export {RequestController}