// js/game.js
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const scoreValueElement = document.getElementById('score-value');

let gameLoop;
let player;
let fishSchool = [];
let foodItems = [];
let predators = [];
let score = 0;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const FISH_SPEED = 2;
const FISH_COUNT = 5;
const FOOD_COUNT = 10;
const PREDATOR_COUNT = 1;
const PREDATOR_SPEED = 1.5;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const backgroundImage = new Image();
backgroundImage.src = 'assets/background.png';

const playerFishSprite = new Image();
playerFishSprite.src = 'assets/player-fish-sprite.png';

const fishSprites = [
  new Image(),
  new Image(),
  new Image(),
  new Image(),
];

fishSprites[0].src = 'assets/fish-sprite-1.png';
fishSprites[1].src = 'assets/fish-sprite-2.png';
fishSprites[2].src = 'assets/fish-sprite-3.png';
fishSprites[3].src = 'assets/fish-sprite-4.png';

const foodSprite = new Image();
foodSprite.src = 'assets/food-sprite.png';

const predatorSprite = new Image();
predatorSprite.src = 'assets/predator-sprite.png';

function initGame() {
  player = new Fish(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, FISH_SPEED, 0, playerFishSprite);

  fishSchool = [];
  for (let i = 0; i < FISH_COUNT; i++) {
    const x = utils.getRandomInt(0, CANVAS_WIDTH);
    const y = utils.getRandomInt(0, CANVAS_HEIGHT);
    const speed = FISH_SPEED * 0.8;
    const direction = utils.getRandomDirection();
    const sprite = fishSprites[utils.getRandomInt(0, fishSprites.length - 1)];
    fishSchool.push(new Fish(x, y, speed, direction, sprite));
  }

  foodItems = [];
  for (let i = 0; i < FOOD_COUNT; i++) {
    const x = utils.getRandomInt(0, CANVAS_WIDTH);
    const y = utils.getRandomInt(0, CANVAS_HEIGHT);
    foodItems.push(new Food(x, y, foodSprite));
  }

  predators = [];
  for (let i = 0; i < PREDATOR_COUNT; i++) {
    const x = utils.getRandomInt(0, CANVAS_WIDTH);
    const y = utils.getRandomInt(0, CANVAS_HEIGHT);
    predators.push(new Predator(x, y, PREDATOR_SPEED, predatorSprite));
  }

  score = 0;
}

function updateGame() {
  // Update player fish position based on mouse movement
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    player.x = event.clientX - rect.left;
    player.y = event.clientY - rect.top;
  });

  // Update fish school positions and directions
  for (const fish of fishSchool) {
    fish.direction = Math.atan2(player.y - fish.y, player.x - fish.x);
    fish.update();
  }

  // Update predator positions
  for (const predator of predators) {
    predator.update(player.x, player.y);
  }

  // Check collision between player and food items
  for (let i = 0; i < foodItems.length; i++) {
    const food = foodItems[i];
    if (utils.calculateDistance(player.x, player.y, food.x, food.y) < 20) {
      foodItems.splice(i, 1);
      score++;
      scoreValueElement.textContent = score;
      i--;
    }
  }

  // Check collision between player and predators
  for (const predator of predators) {
    if (utils.calculateDistance(player.x, player.y, predator.x, predator.y) < 30) {
      endGame();
      break;
    }
  }
}

function drawGame() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  player.draw(ctx);

  for (const fish of fishSchool) {
    fish.draw(ctx);
  }

  for (const food of foodItems) {
    food.draw(ctx);
  }

  for (const predator of predators) {
    predator.draw(ctx);
  }
}

function startGame() {
  initGame();
  gameLoop = setInterval(() => {
    updateGame();
    drawGame();
  }, 1000 / 60);

  startButton.style.display = 'none';
}

function endGame() {
  clearInterval(gameLoop);
  restartButton.style.display = 'inline-block';
}

function restartGame() {
  restartButton.style.display = 'none';
  startGame();
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
