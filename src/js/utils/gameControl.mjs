import { CARDS } from "../../data/CardSets.mjs";
import Clock from "../modules/Clock.mjs";
import Game from "../modules/Game.mjs";

const VIKING = {
  time: 3,
  movements: 20,
};

const BERSERK = {
  time: 2,
  movements: 10,
};

const createNewGame = (difficulty) => {
  const minutes = (difficulty === 'berserker') ? BERSERK.time : VIKING.time;
  const movements = (difficulty === 'berserker') ? BERSERK.movements : VIKING.movements;
  const canvas = document.getElementById('canvas');
  const clock = document.querySelector('#clock');
  const gameClock = new Clock(Clock.minutesToMiliseconds(minutes), clock);
  const gameLoop = new Game(canvas, CARDS, gameClock, movements);
  gameLoop.update();
  return gameLoop;
}

export { createNewGame, VIKING, BERSERK };