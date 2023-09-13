import { createNewGame } from "./utils/gameControl.mjs";

const body = document.querySelector('body');
const backgroundImageUrl = 'url("assets/runas-background.jpg")';
body.style.backgroundImage = backgroundImageUrl;

const startButton = document.querySelector('#start');
const difficultyButtons = document.getElementsByName('difficulty');
let difficultySelected = null;

let game = null;

startButton.addEventListener('click', (e) => {
  e.preventDefault();

  difficultyButtons.forEach((option) => {
    if (option.checked) {
      difficultySelected = option.value;
      startButton.classList.add('inactive');
    }
  });

  if (difficultySelected) {
    console.log(difficultySelected);
    game = createNewGame(difficultySelected);
  }
});