import { Room } from "./Room/Room.js";


const room = new Room();

const track = new Audio("../../../public/sound/M_O_O_N - Dust.mp3");
track.loop = false;
track.volume = 1.0;
track.play();