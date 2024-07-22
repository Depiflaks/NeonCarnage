document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const nickNameInput = document.getElementById('nickName');

    startButton.addEventListener('click', async () => {
        const playerName = nickNameInput.value.trim();
        
        if (!playerName) {
            return;
        }
        try {
            const response = await fetch('/createPlayer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerName })
            });

            const { playerId } = await response.json();

            // Сохранение ID игрока в localStorage
            localStorage.setItem('playerId', playerId);

            // Переадресация на страницу лобби
            window.location.href = '/lobby';
        } catch (error) {
            console.error('Ошибка при создании игрока:', error);
        }
    });
});