// js/predator.js
class Predator {
  constructor(x, y, speed, sprite) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = sprite;
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y);
  }

  update(targetX, targetY) {
    const angle = Math.atan2(targetY - this.y, targetX - this.x);
    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;
  }
}
