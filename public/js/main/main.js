

document.getElementById('start').addEventListener('click', () => {
    localStorage.setItem('responseData', {});
    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {}
    })
    .then(response => response.json())
    .then(data => {
        data.player.nickName = document.getElementById('nickName').value;
        data.player.skinId = document.getElementById('skinId').value;

        localStorage.setItem('responseData', JSON.stringify(data));

        window.location.href = '/game';
    })
    .catch(error => console.error('Error:', error));
});

(async () => {

})();
