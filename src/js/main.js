import { CARDS, PAIRS } from "../data/CardSets.mjs";
import Card from "./modules/Card.mjs";
import Game from "./modules/Game.mjs";

const canvas = document.getElementById('canvas');

const gameLoop = new Game(canvas, CARDS);
gameLoop.givePositionsCards();