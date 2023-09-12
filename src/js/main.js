import { CARDS } from "../data/CardSets.mjs";
import Clock from "./modules/Clock.mjs";
import Game from "./modules/Game.mjs";

const canvas = document.getElementById('canvas');
const clock = document.querySelector('#clock');
const gameClock = new Clock(Clock.minutesToMiliseconds(2), clock);
const gameLoop = new Game(canvas, CARDS, gameClock);

const body = document.querySelector('body');
const backgroundImageUrl = 'url("assets/runas-background.jpg")';
body.style.backgroundImage = backgroundImageUrl;


gameLoop.update();