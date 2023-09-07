import Card from "../js/modules/Card.mjs";
import Pair from "../js/modules/Pair.mjs";

const CARD_WIDTH = 160;
const CARD_HEIGHT = 120;

const CARDS = [];
const PAIRS = [];

for (let i = 1; i <= 30; i++) {
  CARDS.push(new Card(i, 0, 0, CARD_WIDTH, CARD_HEIGHT, '', 'HIDDEN'));
}

for (let i = 0; i < CARDS.length; i += 2) {
  PAIRS.push(new Pair(PAIRS.length + 1, CARDS[i], CARDS[i + 1], false));
}

export { CARDS, PAIRS, CARD_WIDTH, CARD_HEIGHT };