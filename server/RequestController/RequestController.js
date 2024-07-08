import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

class RequestController {
    constructor(app, generator) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.app = app;
        this.generator = generator;

        this.app.use('/public', express.static(path.join(__dirname, '../../public')));

        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/main/main.html'));
        });

        this.app.get('/game', (req, res) => {
            res.sendFile(path.join(__dirname, '../../templates/game/game.html'));
        });

        app.post('/create', (req, res) => {
            console.log('Create new Session');

            const responseData = this.generator.create();
            
            res.json(responseData);
        });
    }
}

export {RequestController}