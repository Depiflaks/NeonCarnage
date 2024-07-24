import { Game } from "./Game/Game.js";

addEventListener('DOMContentLoaded', async () => {
    const playerId = localStorage.getItem('playerId')
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('id');
    fetch(`/getMap?roomId=${roomId}&playerId=${playerId}`)
    .then(response => response.json())
    .then(data => {
        const game = new Game(
            data,
            document
        );
        
        game.loop();
    })
    .catch(error => console.error('Error:', error));
});