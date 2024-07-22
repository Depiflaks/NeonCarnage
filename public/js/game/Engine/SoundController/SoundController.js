class SoundController {
    constructor() {
        this.tracks = {};
        this.playing = [];
        this.volume = 1.0;
    }

    // Добавить трек
    addTrack(name, src) {
        this.tracks[name] = src;
    }

    // Воспроизвести трек
    playTrack(name) {
        const track = new Audio(this.tracks[name]);
        track.loop = false;
        track.volume = this.volume;
        track.play();
        this.playing.push(track);
    }

    // // Пауза трека
    // pauseTrack(name) {
    //     const track = this.playingTracks[name];
    //     if (track) {
    //         track.pause();
    //         delete this.playingTracks[name];
    //     }
    // }

    // // Остановить трек
    // stopTrack(name) {
    //     const track = this.playingTracks[name];
    //     if (track) {
    //         track.pause();
    //         track.audio.currentTime = 0;
    //         delete this.playingTracks[name];
    //     }
    // }
}

export {SoundController}