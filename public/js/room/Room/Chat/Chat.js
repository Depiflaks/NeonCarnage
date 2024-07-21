export class Chat {
    constructor() {
        this.chat = document.querySelector(".message-area");
        this.input = document.querySelector(".text-input");
    }
    
    clearInput() {
        this.input.value = "";
    }
    
    getInput() {
        return this.input.value;
    }

    addMessage(nick, text) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `> <span>${nick}:</span> ${text}`;
        this.chat.appendChild(messageElement);
        this.chat.scrollTop = this.chat.scrollHeight;
    }
}