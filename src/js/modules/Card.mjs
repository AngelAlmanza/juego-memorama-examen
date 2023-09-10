export default class Card {
  constructor (id, x, y, w, h, imagenSrc, state) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imagen = new Image();
    this.imagen.src = imagenSrc;
    this.loadImage = new Promise((resolve) => {
      this.imagen.onload = () => resolve();
    });
    this.state = state;
    this.reverseCards = new Image();
    this.reverseCards.src = 'assets/background.jfif';
    this.loadBackgroundImage = new Promise((resolve) => {
      this.reverseCards.onload = () => resolve();
    });
  }

  async drawCard (ctx) {
    await this.loadBackgroundImage;
    await this.loadImage;
    if (this.state === 'HIDDEN') {
      ctx.drawImage(this.reverseCards, this.x, this.y, this.w, this.h);
    }
    if (this.state === 'VISIBLE') {
      ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
    }
  }

  detectedClickCard (cursorX, cursorY) {
    if (
      cursorX >= this.x &&
      cursorX <= this.x + this.w &&
      cursorY >= this.y &&
      cursorY <= this.y + this.h
    ) {
      return true;
    }
  }

  flipCard (ctx) {
    ctx.clearRect(this.x, this.y, this.w, this.h);
    this.drawCard(ctx);
  }
}