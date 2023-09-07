import { CARDS } from "../data/CardSets.mjs";
import Game from "./modules/Game.mjs";

const canvas = document.getElementById('canvas');
const gameLoop = new Game(canvas, CARDS);

gameLoop.update();