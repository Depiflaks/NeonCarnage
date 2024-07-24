import mysql from 'mysql2';
import { DATA_BASE } from '../CONST/SERVER/SERVER.js';
import { GAME_MODE } from '../CONST/GAME/GAME.js'
import { Player } from './Player/Player.js';
import { Lobby } from './Lobby/Lobby.js';

class DatabaseController {
    constructor() {
        this.connection = mysql.createConnection(DATA_BASE.ignat);

        this.connection.connect((err) => {
            if (err) return console.error("Ошибка: " + err.message);
            console.log("Подключение к серверу MySQL успешно установлено");
        });

        this.player = new Player(this.connection);
        this.lobby = new Lobby(this.connection);
    }

    // Добавление игрока c ready="N" и возвращение его id
    async addPlayer(playerName) {
        const result = await this.player.addPlayer(playerName);
        return result.insertId;
    }

    // Создание lobby
    async createLobby(ownerId, port) {
        const gameMode = GAME_MODE.deathMatch.name;
        const mapNumber = 1;
        const timeCreation = new Date().toISOString().slice(0, 19).replace('T', ' '); // Текущее время
        
        const result = await this.lobby.addLobby(ownerId, gameMode, mapNumber, port, timeCreation);
        await this.player.updatePlayerParameter(ownerId, "lobby_id", result.insertId);
        await this.player.updatePlayerParameter(ownerId, "is_owner", 1);
        await this.player.updatePlayerParameter(ownerId, "ready", 1);
        return result.insertId;
    }

    // Удаление игрока из лобби
    async removePlayerFromLobby(playerId) {
        const player = await this.player.getPlayerById(playerId);
        if (!player) return;
        const lobbyId = player.lobby_id;
        await this.player.updatePlayerParameter(playerId, "lobby_id", null);
        await this.player.updatePlayerParameter(playerId, "is_owner", 0);
        await this.player.updatePlayerParameter(playerId, "ready", 0);
        const playersInLobby = await this.player.getPlayersByRoomId(lobbyId);
        if (playersInLobby.length === 0) {
            await this.lobby.deleteLobby(lobbyId);
            return lobbyId ? lobbyId : -1;
        } else if (player.is_owner) {
            const newOwnerId = playersInLobby[0].player_id || null;
            await this.lobby.updateLobbyParameter(lobbyId, "owner_id", newOwnerId);
            await this.player.updatePlayerParameter(newOwnerId, "is_owner", 1);
            await this.player.updatePlayerParameter(newOwnerId, "ready", 1);
            return -1;
        }
        return -1;
    }

    // Удаление игрока из лобби по запросу владельца
    async ownerRemovePlayerFromLobby(ownerId, playerIdToRemove) {
        const owner = await this.player.getPlayerById(ownerId);
        if (!owner) return;
        const lobbyId = owner.lobby_id;
        const lobby = await this.lobby.getLobbyById(lobbyId);
        if (!lobby || lobby.owner_id !== ownerId) return;
        const playerToRemove = await this.player.getPlayerById(playerIdToRemove);
        if (playerToRemove) {
            await this.player.updatePlayerParameter(playerToRemove.player_id, "lobby_id", null);
        }
    }

    // Обновление данных игрока
    async updatePlayer(playerId, parameters) {
        const keys = Object.keys(parameters);
        for (const key of keys) {
            await this.player.updatePlayerParameter(playerId, key, parameters[key]);
        }
    }

    // Обновление данных лобби
    async updateLobby(lobbyId, parameters) {
        const keys = Object.keys(parameters);
        for (const key of keys) {
            await this.lobby.updateLobbyParameter(lobbyId, key, parameters[key]);
        }
    }

    async isPlayerHost(playerId, lobbyId) {
        const lobby = await this.lobby.getLobbyById(lobbyId);
        if (!lobby) throw new Error('Lobby not found');
        return lobby.owner_id == playerId;
    }

    async getPlayersByLobbyId(lobbyId) {
        return await this.player.getPlayersByRoomId(lobbyId)
    }

    async getAllPlayers() {
        return await this.player.getAllPlayers();
    }

    async getAllLobbies() {
        return await this.lobby.getAllLobbies();
    }
}

export {DatabaseController}
