export class PlayerRequest {
    constructor(app, database, child, creature) {
        this.database = database;
        this.app = app;
        this.child = child;
        this.creature = creature;
        this.initGet();
        this.initPost();
    }

    initGet() {
        this.app.get('/getPlayers', async (req, res) => {
            const roomId = req.query.roomId;
            try {
                const players = await this.database.getPlayersByLobbyId(roomId);
                res.json(players);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.get('/getPlayer', async (req, res) => {
            const playerId = req.query.playerId;
            try {
                const player = await this.database.player.getPlayerById(playerId);
                res.json(player);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });
    }

    initPost() {
        this.app.post('/enterLobby', async (req, res) => {
            try {
                const { lobbyId, playerName, socketId, skinId } = req.body;
                const existingPlayer = await this.database.getPlayerByName(playerName);

                if (existingPlayer) {
                    res.json({ playerId: existingPlayer.player_id });
                } else {
                    const playerId = await this.database.addPlayer(lobbyId, playerName, socketId, skinId);
                    res.json({ playerId });
                }
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.post('/createPlayer', async (req, res) => {
            try {
                const { playerName } = req.body;
                const players = await this.database.getAllPlayers();
                let playerId = -1;
                for (let player of players) {
                    if (player.player_name === playerName) {
                        playerId = player.player_id;
                        break;
                    }
                }
                if (playerId === -1) {
                    playerId = await this.database.addPlayer(playerName);
                }
                res.json({ playerId });
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.post('/updatePlayer', async (req, res) => {
            try {
                const { playerId, skinId, ready } = req.body;
                const parameters = {
                    skin_id: skinId, 
                    ready: ready,
                };
                await this.database.updatePlayer(playerId, parameters);
                res.send('Player updated successfully');
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.post('/getAllPlayers', async (req, res) => {
            try {
                const players = await this.database.getAllPlayers();
                res.json(players);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.post('/joinLobby', async (req, res) => {
            try {
                const { playerId, lobbyId } = req.body;
        
                const players = await this.database.getPlayersByLobbyId(lobbyId);
        
                if (players.length < 4) {
                    await this.database.updatePlayer(playerId, { "lobby_id": lobbyId });
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