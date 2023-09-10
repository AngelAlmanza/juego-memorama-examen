import Card from "../js/modules/Card.mjs";
import Pair from "../js/modules/Pair.mjs";

const CARDS_IMAGES = [
  'assets/cards/fenrir.webp',
  'assets/cards/freya.webp',
  'assets/cards/hela.jpg',
  'assets/cards/jormundgander.jpg',
  'assets/cards/kraken.jpg',
  'assets/cards/loki.jfif',
  'assets/cards/odin.webp',
  'assets/cards/ragnarok.jpg',
  'assets/cards/thor.webp',
  'assets/cards/trol.jpg',
  'assets/cards/valhalla.jpg',
  'assets/cards/valquiria.jpg',
  'assets/cards/vikingos.webp',
  'assets/cards/yggdrasil.jfif',
  'assets/cards/ymir.jpg',
];

const CARD_WIDTH = 160;
const CARD_HEIGHT = 120;

const CARDS = [];
const PAIRS = [];

let imageIndex = 0;

for (let i = 1; i <= 30; i++) {
  const image = CARDS_IMAGES[Math.floor(imageIndex / 2)];
  CARDS.push(new Card(i, 0, 0, CARD_WIDTH, CARD_HEIGHT, image, 'HIDDEN'));
  imageIndex++;
}

for (let i = 0; i < CARDS.length; i += 2) {
  PAIRS.push(new Pair(PAIRS.length + 1, CARDS[i], CARDS[i + 1], false));
}

export { CARDS, PAIRS, CARD_WIDTH, CARD_HEIGHT };