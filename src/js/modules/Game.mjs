import { CARD_HEIGHT, CARD_WIDTH, PAIRS } from "../../data/CardSets.mjs";
import Pair from "./Pair.mjs";

export default class Game {
  constructor (canvas, cards, clock) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.cards = cards;
    this.cursorX = null;
    this.cursorY = null;
    this.startNewGame = true;
    this.visibleCards = [];
    this.foundPairs = [];
    this.clock = clock;
    this.handleCardClickReference = this.handleCardClick.bind(this);
    this.canvas.addEventListener('click', this.handleCardClickReference);
  }

  checkCardClick () {
    for (const card of this.cards) {
      if (card.detectedClickCard(this.cursorX, this.cursorY)) {
        if (card.state === 'DISCOVERED') return;
        card.state = (card.state === 'HIDDEN') ? 'VISIBLE' : 'HIDDEN';
        card.flipCard(this.ctx);
        this.handleTwoVisibleCards(card);
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

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let currentElement = this.cards[i];
      this.cards[i] = this.cards[randomIndex];
      this.cards[randomIndex] = currentElement;
    }
  }

  handleTwoVisibleCards (card) {
    this.cleantTwoVisibleCards();
    if (card.state === 'HIDDEN') return;
    this.visibleCards.push(card);
    if (this.visibleCards.length < 3) return;
    const pairToCompare = new Pair(Symbol(), this.visibleCards[0], this.visibleCards[1], false);
    const check = this.checkForMatchingPair(pairToCompare);
    if (!check) {
      this.setHiddenCardsInVisibleCards();
    }
  }

  cleantTwoVisibleCards () {
    this.visibleCards = this.visibleCards.filter(c => c.state === 'VISIBLE');
  }

  setHiddenCardsInVisibleCards () {
    this.visibleCards[0].state = 'HIDDEN';
    this.visibleCards[1].state = 'HIDDEN';
    this.visibleCards = [this.visibleCards[2]];
  }

  checkForMatchingPair (pairToCompare) {
    const matchingPair = PAIRS.find(pair => {
      return (
        (pair.card1 === pairToCompare.card1 && pair.card2 === pairToCompare.card2) ||
        (pair.card1 === pairToCompare.card2 && pair.card2 === pairToCompare.card1)
      );
    });
    if (!matchingPair) {
      return false;
    }
    matchingPair.discovered = true;
    this.disableCards(matchingPair);
    return true;
  }

  disableCards (pair) {
    pair.card1.state = 'DISCOVERED';
    pair.card2.state = 'DISCOVERED';
    this.foundPairs.push(pair);
  }

  drawCardsNewGame () {
    this.cards.forEach((card, index) => {
      setTimeout(() => {
        card.drawCard(this.ctx);
      }, 100 * index);
    });
  }

  drawHiddenCards () {
    for (const card of this.cards) {
      if (card.state === 'HIDDEN') {
        card.drawCard(this.ctx);
      }
    }
  }

  removeHandleCardClick () {
    this.canvas.removeEventListener('click', this.handleCardClickReference);
  }

  checkLastPair () {
    if (this.foundPairs.length <= 13) return;
    const cardsNotDiscovered = this.cards.filter(c => c.state === 'VISIBLE');
    if (cardsNotDiscovered.length < 2) return;
    cardsNotDiscovered[0].state = 'DISCOVERED';
    cardsNotDiscovered[1].state = 'DISCOVERED';
    const lastPair = new Pair(Symbol(), cardsNotDiscovered[0], cardsNotDiscovered[0], true)
    this.foundPairs.push(lastPair);
  }

  repaint () {
    if (this.startNewGame) {
      this.shuffleCards();
      this.givePositionsCards();
      this.drawCardsNewGame();
      this.startNewGame = false;
      this.clock.showTime();
    }
    if (!this.startNewGame) {
      this.drawHiddenCards();
    }
  }

  update () {
    this.repaint();
    this.checkLastPair();
    if (this.clock.time <= 0 || this.foundPairs.length === 15) {
      this.removeHandleCardClick();
      console.log('The game has ended');
    }
    window.requestAnimationFrame(this.update.bind(this));
  }
}