export class Skin {
    constructor() {
        this.skin = document.getElementById('player-skin');
        const firstOption = this.skin.options[this.skin.selectedIndex];
        this.skin.style.backgroundImage = `url(${firstOption.getAttribute('data-icon')})`;
        
        this.skin.addEventListener('change', (event) => {
            this.onSkinChange(event);
        });
    }

    onSkinChange(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const iconUrl = selectedOption.getAttribute('data-icon');
        event.target.style.backgroundImage = `url(${iconUrl})`;
    }
}