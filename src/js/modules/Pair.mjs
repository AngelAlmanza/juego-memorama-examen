export default class Pair {
  constructor (id, card1, card2, discovered) {
    this.id = id;
    this.card1 = card1;
    this.card2 = card2;
    this.discovered = discovered;
  }

  isDiscovered () {
    if (this.card1.state === 'visible' && this.card2.state === 'visible') {
      this.discovered = true;
    }
    this.discovered = false;
  }
}