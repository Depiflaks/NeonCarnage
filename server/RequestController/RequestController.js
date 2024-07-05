import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

class RequestController {
    constructor(app) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.app = app
        this.app.use('/public', express.static(path.join(__dirname, '../../public')));

        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/main/main.html'));
        });

        this.app.get('/game', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/game/game.html'));
        });

        app.post('/create', (req, res) => {
            console.log('Create new Session');

            const responseData = {
                message: 'Data received successfully',
            };
        
            res.json(responseData);
        });
    }
}

export {RequestController}