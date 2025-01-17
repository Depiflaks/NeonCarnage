import { Chat } from "./Chat/Chat.js";
import { ConnectionController } from "../Connection/ConnectionController.js";
import { Skin } from "./Skin/Skin.js";
import { PlayerList } from "./PlayerList/PlayerList.js";

export class Room {
    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        this.roomId = urlParams.get('id');
        this.playerId = localStorage.getItem('playerId');

        this.chat = new Chat();
        this.skin = new Skin();
        this.readyButton = document.getElementById('ready-button');
        this.exitButton = document.getElementById('exit-button')
        this.gameMode = document.getElementById('game-mode');
        this.mapNumber = document.getElementById('map-number');
        this.adminTip = document.getElementById('admin-tip')

        this.list = new PlayerList(this.playerId);
        
        this.initEventListeners();
    }

    initEventListeners() {
        addEventListener("keydown", (event) => {
            this.onKeyDown(event)
        });
        addEventListener('DOMContentLoaded', async () => {
            await this.onPageLoad()
        });
        this.readyButton.addEventListener('click', async () => {
            await this.onReadyButtonClick()
        });
        this.exitButton.addEventListener('click', async () => {
            await this.onExitButtonClick()
        })
        this.gameMode.addEventListener("change", async () => {
            await this.changeMaps();
            await this.updateRoom();
        });
        this.mapNumber.addEventListener("change", async () => {
            await this.updateRoom();
        });
        setInterval(async () => {
            await this.updatePlayersList();
            await this.updateState();
        }, 500);
    }

    async onPageLoad() {
        await this.updatePlayersList();

        await this.updateState(true);
    }

    async updateState(init=false) {
        const playerResponse = await fetch(`/getPlayer?playerId=${this.playerId}`);
        const player = await playerResponse.json();
        const lobbyResponse = await fetch(`/getRoom?roomId=${this.roomId}`);
        const lobby = (await lobbyResponse.json());

        if (lobby.is_started) {
            const dataResponse = await fetch(`/getMap?roomId=${this.roomId}&playerId=${this.playerId}`);
            const data = await dataResponse.json();
            localStorage.setItem("responseData", JSON.stringify(data));
            window.location.href = `/game?id=${this.roomId}`;
        }

        if (init) {
            this.readyButton.innerHTML = player.ready ? "Not ready": "Ready";
            this.connection = new ConnectionController(this.chat, lobby.address);
        }

        this.nickName = player.player_name;
        this.isOwner = player.is_owner;

        this.gameMode.disabled = !player.is_owner;
        this.mapNumber.disabled = !player.is_owner;
        this.skin.skin.disabled = player.ready && !player.is_owner;

        this.gameMode.value = lobby.game_mode;
        this.mapNumber.value = lobby.map_number;
        this.ownerID = lobby.owner_id;

        this.adminTip.style.display = player.is_owner ? "block" : "none"

        if (player.is_owner) {
            const playersResponse = await fetch(`/getPlayers?roomId=${this.roomId}`);
            const players = await playersResponse.json();
            const count = players.length;
            const ready = players.filter(player => player.ready).length;
            if (count === 1 || ready < count) {
                this.readyButton.disabled = true;
                this.readyButton.innerHTML = `Waiting...`;
            }
            if (count !== 1 && ready === count) {
                this.readyButton.disabled = false;
                this.readyButton.innerHTML = `Start`;
            }
            this.readyButton.disabled = false;
        }

        if (!player.lobby_id) await this.onExitButtonClick()
    }

    async changeMaps() {
        switch (this.gameMode.value) {
            case "Death Match":
                this.mapNumber.innerHTML = `
                <option value="1">Bloodshed Maze</option>
                <option value="2">Carnage Central</option>
                <option value="3">Annihilation Alley</option>
                `;
                break;
            case "Battle Royale":
                this.mapNumber.innerHTML = `
                <option value="1">Doomsday Junction</option>
                `;
                break;
            case "Operation Overrun":
                this.mapNumber.innerHTML = `
                <option value="1">Ghostly Gallows</option>
                `;
                break;
            default:
                break;
        }
    }

    async updatePlayersList() {
        const response = await fetch(`/getPlayers?roomId=${this.roomId}`);
        const players = await response.json();
        this.list.update(players, this.ownerID);
    }

    async updateRoom(isStarted=0) {
        await fetch('/updateLobby', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerId: this.playerId,
                lobbyId: this.roomId,
                parameters: {
                    "map_number": this.mapNumber.value,
                    "game_mode": this.gameMode.value, 
                    "is_started": isStarted,
                }
            })
        });
    }

    onKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (this.chat.getInput() != "") this.connection.send(this.nickName, this.chat.getInput());
            this.chat.clearInput();
        }
    }

    async onExitButtonClick() {
        this.exitButton.disabled = true;
        await fetch('/leaveLobby', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerId: this.playerId })
        });
        window.location.href = `/lobby`;
    }

    async onReadyButtonClick() {
        const skin = document.getElementById('player-skin').value;
        
        const response = await fetch(`/getPlayer?playerId=${this.playerId}`);
        const player = await response.json();
        if (this.ownerID != this.playerId) {
            player.ready ^= 1;
            this.readyButton.innerHTML = player.ready ? "Not ready" : "Ready";
        } else {
            this.readyButton.disabled = true;
        }
        await fetch('/updatePlayer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerId: this.playerId, parameters: {skin_id: skin, ready: player.ready} })
        });
        await this.updatePlayersList();
        if (this.ownerID == this.playerId) {
            await this.startGame();
        }
    }

    async startGame() {
        console.log("lets start!");
        await this.updateRoom(1);
        await fetch(`/startGame?roomId=${this.roomId}`);
        
    }

    updateLocalStorage() {
        localStorage.setItem('responseData', JSON.stringify(this.data));
    }
}