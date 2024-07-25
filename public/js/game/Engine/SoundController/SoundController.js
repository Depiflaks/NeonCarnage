class SoundController {
    constructor() {
        this.tracks = {};
        this.playing = {};
        this.volume = 1.0;
    }

    init(sounds) {
        sounds.forEach(sound => {
            this.addTrack(sound.name, sound.src);
        });
    }
    
    // Добавить трек
    addTrack(name, src) {
        this.tracks[name] = src;
    }

    // Воспроизвести трек
    playTrack(name) {
        if (!this.tracks[name]) {
            console.error(`Track ${name} not found.`);
            return;
        }
        const track = new Audio(this.tracks[name]);
        track.loop = false;
        track.volume = this.volume;
        track.play();
        this.playing[name] = track;
    }

    loopTrack(name) {
        if (!this.tracks[name]) {
            console.error(`Track ${name} not found.`);
            return;
        }
        const track = new Audio(this.tracks[name]);
        track.loop = true;
        track.volume = this.volume;
        track.play();
        this.playing[name] = track;
    }

    // Обновить звуки
    updateSounds() {
        for (let name in this.playing) {
            if (this.playing[name].ended) {
                delete this.playing[name];
            }
        }
    }

    isPausedTrack(name) {
        if(this.playing[name]) {
            if (this.playing[name].paused) {
                return true;
            }
        }
        return false;
    }

    pauseTrack(name) {
        if (this.playing[name]) {
            this.playing[name].pause();
        }
    }

    // Установить громкость
    setVolume(newVolume) {
        this.volume = newVolume;
        for (let name in this.playing) {
            this.playing[name].volume = newVolume;
        }
    }
}

export { SoundController }
