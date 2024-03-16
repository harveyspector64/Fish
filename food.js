// js/food.js
class Food {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y);
  }
}
