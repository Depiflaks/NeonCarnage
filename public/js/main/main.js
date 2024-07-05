document.getElementById('start').addEventListener('click', () => {
    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {}
    })
    .then(response => response.json())
    .then(data => {

        localStorage.setItem('responseData', JSON.stringify(data));

        window.location.href = '/game';
    })
    .catch(error => console.error('Error:', error));
});


async function startGame() {
    
}