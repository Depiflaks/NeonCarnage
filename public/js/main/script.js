document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('skinId');

    selectElement.addEventListener('change', (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const iconUrl = selectedOption.getAttribute('data-icon');
        event.target.style.backgroundImage = `url(${iconUrl})`;
    });

    // Инициализируем фон для первого элемента
    const firstOption = selectElement.options[selectElement.selectedIndex];
    selectElement.style.backgroundImage = `url(${firstOption.getAttribute('data-icon')})`;
});
