import { GAME_MODE } from "../../CONST/GAME/GAME.js";
import { ADDRESS } from "../../CONST/SERVER/SERVER.js";

export class LobbyRequest {
    constructor(app, database, child, creature) {
        this.database = database;
        this.app = app;
        this.child = child;
        this.creature = creature;
        this.initGet();
        this.initPost();
    }

    initGet() {
        this.app.get('/getRoom', async (req, res) => {
            try {
                const { roomId } = req.query;
                const responseData = await this.database.lobby.getLobbyById(roomId);
                res.json(responseData);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.get('/startGame', async (req, res) => {
            try {
                const { roomId } = req.query;
                const players = await this.database.getPlayersByLobbyId(roomId);
                const lobby = await this.database.lobby.getLobbyById(roomId)
                const allReady = players.every(player => player.ready);
                if (allReady) {
                    //console.log(3, lobby.game_mode);
                    this.child.sendStart(roomId, {
                        map: this.creature.createMap(lobby.game_mode, lobby.map_number),
                        mode: lobby.game_mode,
                    });
                }
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.get('/getMap', async (req, res) => {
            try {
                const { roomId, playerId } = req.query;
                const lobby = await this.database.lobby.getLobbyById(roomId);
                const player = await this.database.player.getPlayerById(playerId);
                const data = this.creature.createMap(lobby.game_mode, lobby.map_number);
                data.player.nickName = player.player_name;
                data.player.skinId = player.skin_id;
                data.address = lobby.address;
                //console.log(1, lobby.game_mode);
                switch (lobby.game_mode) {
                    case GAME_MODE.deathMatch.name:
                        data.mode = GAME_MODE.deathMatch;
                        break;
                    case GAME_MODE.battleRoyale.name:
                        data.mode = GAME_MODE.battleRoyale;
                        break;
                    case GAME_MODE.operationOverrun.name:
                        data.mode = GAME_MODE.operationOverrun;
                        break;
                }
                //console.log(1, data.mode);
                res.json(data);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });
    }

    initPost() {
        this.app.post('/createLobby', async (req, res) => {
            try {
                const { ownerId } = req.body;

                const port = this.child.getNewPort();
                const address = ADDRESS.sergey.start + port + ADDRESS.sergey.end;
                const lobbyId = await this.database.createLobby(ownerId, address);
                this.child.create(lobbyId, port);

                res.json({ lobbyId });
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.post('/updateLobby', async (req, res) => {
            try {
                const { playerId, lobbyId, parameters } = req.body;
                const isHost = await this.database.isPlayerHost(playerId, lobbyId);
                if (isHost) {
                    await this.database.updateLobby(lobbyId, parameters);
                    res.send('Lobby updated successfully');
                } else {
                    res.status(403).send('Only the host can update lobby parameters');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.post('/leaveLobby', async (req, res) => {
            try {
                const { playerId } = req.body;
                const lobbyId = await this.database.removePlayerFromLobby(playerId);
                if (lobbyId >= 0) this.child.kill(lobbyId);
                res.send('Player removed from lobby');
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.post('/removePlayer', async (req, res) => {
            try {
                const { ownerId, playerIdToRemove } = req.body;
                await this.database.ownerRemovePlayerFromLobby(ownerId, playerIdToRemove);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });

        this.app.post('/getAllLobbies', async (req, res) => {
            try {
                const lobbies = await this.database.getAllLobbies();
                res.json(lobbies);
            } catch (error) {
                console.error('Ошибка:', error);
                res.status(500).send('Ошибка сервера');
            }
        });
    }
}