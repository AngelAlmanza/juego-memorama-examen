import { CARD_HEIGHT, CARD_WIDTH } from "../../data/CardSets.mjs";

export default class Game {
  constructor (canvas, cards) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.cards = cards;
    this.cursorX = null;
    this.cursorY = null;
    this.canvas.addEventListener('click', this.handleCardClick.bind(this));
    this.startNewGame = true;
  }

  static generarColorAleatorio () {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random();
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  checkCardClick () {
    for (const card of this.cards) {
      if (card.detectedClickCard(this.cursorX, this.cursorY)) {
        card.state = (card.state == 'HIDDEN') ? 'VISIBLE' : 'HIDDEN';
        card.flipCard(this.ctx);
        return;
      }
    }
  }

  handleCardClick (e) {
    this.cursorX = e.offsetX;
    this.cursorY = e.offsetY;
    this.checkCardClick();
  }

  givePositionsCards () {
    // const numRows = 5;
    const numCols = 6;
    const totalWidth = numCols * CARD_WIDTH;
    const totalGap = (numCols - 1) * 20;
    const extraSpace = (this.canvasWidth - totalWidth - totalGap) / 2;
    for (let i = 0; i < this.cards.length; i++) {
      const row = Math.floor(i / numCols);
      const col = i % numCols;
      const x = col * (CARD_WIDTH + 20) + extraSpace;
      const y = row * (CARD_HEIGHT + 20) + 20;
      this.cards[i].x = x;
      this.cards[i].y = y;
    }
  }

  shuffleCards () {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let indiceAleatorio = Math.floor(Math.random() * (i + 1));
      let elementoActual = this.cards[i];
      this.cards[i] = this.cards[indiceAleatorio];
      this.cards[indiceAleatorio] = elementoActual;
    }
  }

  drawCardsNewGame () {
    this.cards.forEach((card, index) => {
      setTimeout(() => {
        card.drawCard(this.ctx);
      }, 100 * index);
    });
  }

  repaint () {
    if (this.startNewGame) {
      this.givePositionsCards();
      this.drawCardsNewGame();
      this.startNewGame = false;
    }
  }

  update () {
    this.repaint();
    window.requestAnimationFrame(this.update.bind(this));
  }
}