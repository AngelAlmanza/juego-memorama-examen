export default class Card {
  constructor (id, x, y, w, h, imagen, state) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imagen = imagen;
    this.state = state;
  }

  drawCard (ctx) {
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}