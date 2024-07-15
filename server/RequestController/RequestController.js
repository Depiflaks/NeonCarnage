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
                const responseData = await this.connection.getAllFromLobby();
                res.json(responseData);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.get('/game', (req, res) => {
            connection.closeConnection();
            res.sendFile(path.join(__dirname, '../../templates/game/game.html'));
        });

        this.app.post('/create', (req, res) => {
            console.log('Create new Session');

            const responseData = this.generator.create();
            
            res.json(responseData);
        });

        this.app.post('/createRoom', async (req, res) => {
            try {
                console.log(req.body);
                // const responseData = await this.connection.getRoomId();
                // const lastInserId = responseData.insertId;
                // console.log(lastInserId);
                // // res.json(responseData);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.post('/room', async (req, res) => {
            try {
                const responseData = await this.connection.getAllFromLobby();
                res.json(responseData);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });
    }
}

export {RequestController}