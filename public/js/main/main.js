

document.getElementById('start').addEventListener('click', () => {
    localStorage.setItem('responseData', {});
    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        data.player.nickName = document.getElementById('nickName').value;

        localStorage.setItem('responseData', JSON.stringify(data));

        window.location.href = `/lobby`;
    })
    .catch(error => console.error('Error:', error));
});

(async () => {

})();
