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
const FISH_COUNT = 3;
const FOOD_COUNT = 10;
const PREDATOR_COUNT = 2;
const PREDATOR_SPEED = 1.5;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const backgroundImage = new Image();
backgroundImage.src = 'assets/background.png';

const playerFishSprite = new Image();
playerFishSprite.src = 'assets/player-fish.png';

const fishSprites = [
  new Image(),
  new Image(),
  new Image(),
];

fishSprites[0].src = 'assets/fish-1.png';
fishSprites[1].src = 'assets/fish-2.png';
fishSprites[2].src = 'assets/fish-3.png';

const foodSprite = new Image();
foodSprite.src = 'assets/food.png';

const sharkSprite = new Image();
sharkSprite.src = 'assets/shark.png';

const dolphinSprite = new Image();
dolphinSprite.src = 'assets/dolphin.png';

function initGame() {
  player = new Fish(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, FISH_SPEED, 0, playerFishSprite);

  fishSchool = [];
  for (let i = 0; i < FISH_COUNT; i++) {
    const x = utils.getRandomInt(0, CANVAS_WIDTH);
    const y = utils.getRandomInt(0, CANVAS_HEIGHT);
    const speed = FISH_SPEED * 0.8;
    const direction = utils.getRandomDirection();
    const sprite = fishSprites[i];
    fishSchool.push(new Fish(x, y, speed, direction, sprite));
  }

  foodItems = [];
  for (let i = 0; i < FOOD_COUNT; i++) {
    const x = utils.getRandomInt(0, CANVAS_WIDTH);
    const y = utils.getRandomInt(0, CANVAS_HEIGHT);
    foodItems.push(new Food(x, y, foodSprite));
  }

  predators = [];
  predators.push(new Predator(0, 0, PREDATOR_SPEED, sharkSprite));
  predators.push(new Predator(CANVAS_WIDTH, CANVAS_HEIGHT, PREDATOR_SPEED, dolphinSprite));

  score = 0;
}

// ... (rest of the code remains the same)
