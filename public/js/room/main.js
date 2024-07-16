import { ConnectionController } from "./Connection/ConnectionController.js";

const urlParams = new URLSearchParams(window.location.search);
const lastInsertId = urlParams.get('lastInsertId');
console.log('Last Insert ID:', lastInsertId);
const socket = new ConnectionController();