import { CARD_HEIGHT, CARD_WIDTH } from "../../data/CardSets.mjs";

export default class Game {
  constructor(canvas, cards) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.cards = cards;
  }

  static generarColorAleatorio () {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random();
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  givePositionsCards() {
    // const numRows = 5;
    const numCols = 6;
    const totalWidth = numCols * CARD_WIDTH;
    const totalGap = (numCols - 1) * 20;
    const extraSpace = (this.canvasWidth - totalWidth - totalGap) / 2;
    for (let i = 0; i < this.cards.length; i++) {
      this.ctx.fillStyle = Game.generarColorAleatorio();
      const row = Math.floor(i / numCols);
      const col = i % numCols;
      const x = col * (CARD_WIDTH + 20) + extraSpace;
      const y = row * (CARD_HEIGHT + 20) + 20;
      this.cards[i].x = x;
      this.cards[i].y = y;
      this.cards[i].drawCard(this.ctx);
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
}