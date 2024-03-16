// js/fish.js
class Fish {
  constructor(x, y, speed, direction, sprite) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
    this.sprite = sprite;
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y);
  }

  update() {
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;
  }
}
