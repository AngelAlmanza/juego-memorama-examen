import { CARDS } from "../data/CardSets.mjs";
import Game from "./modules/Game.mjs";

const canvas = document.getElementById('canvas');
const gameLoop = new Game(canvas, CARDS);

const body = document.querySelector('body');
const backgroundImageUrl = 'url("assets/runas-background.jpg")';
body.style.backgroundImage = backgroundImageUrl;

gameLoop.update();