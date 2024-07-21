import { Chat } from "./Chat/Chat.js";
import { ConnectionController } from "../Connection/ConnectionController.js";
import { Skin } from "./Skin/Skin.js";
import { PlayerList } from "./PlayerList/PlayerList.js";

export class Room {
    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        this.id = urlParams.get('id');

        this.chat = new Chat();
        this.skin = new Skin();
        this.readyButton = document.getElementById('ready-button');
        this.nickName = this.data.player.nickName;
        this.list = new PlayerList();

        this.connection = new ConnectionController(this.chat);
        this.data = JSON.parse(localStorage.getItem('responseData'));
        
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

        setInterval(async () => {
            await this.updatePlayersList();
        }, 1000);
    }

    async onPageLoad() {
        await this.updatePlayersList();

        const playerResponse = await fetch(`/setPlayer?roomId=${this.id}&nickname=${this.nickName}`);
        
        const playerId = await playerResponse.json();

        const response = await fetch('/getRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: this.id })
        });
        const responseData = await response.json();
        if(responseData[0].owner_id === 1) {
            const ownerId = playerId;
            const ownerResponse = await fetch(`/setRoomOwner?roomId=${this.id}&ownerId=${ownerId}`);
            await this.updatePlayersList();
        }
    }

    async updatePlayersList() {
        const response = await fetch(`/getPlayers?roomId=${this.id}`);
        const players = await response.json();
    
        this.list.update(players);
    }

    onKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            this.connection.send(this.nickName, this.chat.getInput());
            this.chat.clearInput();
        }
    }

    async onReadyButtonClick() {
        this.data.player.skinId = document.getElementById('player-skin').value;

        const playerResponse = await fetch(`/getPlayer?playerId=${this.id}`);
        const player = await playerResponse.json();
        if(player[0].ready == 'N') {
            player[0].ready = 'Y';
        } else {
            player[0].ready = 'N';
        }
        const readyResponse = await fetch(`/setPlayerState?playerId=${playerId}&ready=${player[0].ready}`);
    }

    updateLocalStorage() {
        localStorage.setItem('responseData', JSON.stringify(this.data));
    }
}