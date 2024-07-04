import { groundList, wallList, weaponSet } from "./data.js";
import {ConnectionController} from "./Connection/ConnectionController.js";

const canvas = document.getElementById("canvas");

const connection = new ConnectionController(canvas);