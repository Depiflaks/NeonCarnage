import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';


import { DatabaseController } from '../DatabaseController/DatabaseController.js';
import { ADDRESS } from '../CONST/SERVER/SERVER.js';
import { LobbyRequest } from './LobbyRequest/LobbyRequest.js';
import { PlayerRequest } from './PlayerRequest/PlayerRequest.js';

class RequestController {
    constructor(app, creature, child) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.database = new DatabaseController();
        this.app = app;
        this.creature = creature;
        this.child = child;
        this.lobbyRequest = new LobbyRequest(this.app, this.database, this.child, this.creature);
        this.playerRequest = new PlayerRequest(this.app, this.database, this.child, this.creature);
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

        this.app.post('/create', (req, res) => {
            console.log('Create new Session');

            const responseData = this.creature.create();
            
            res.json(responseData);
        });
    }
}

export { RequestController };
