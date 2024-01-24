import "./main.css";
import {
  createElementOnBoard,
  generateFoodPosition,
  generateSnakePosition,
} from "./helpers/helpers";
import { Direction, Position } from "./types/types";

const score = document.getElementById("score") as HTMLHeadingElement;
const board = document.getElementById("board") as HTMLElement;
const logo = document.getElementById("logo") as HTMLImageElement;
const buttonStart = document.getElementById(
  "start-button"
) as HTMLButtonElement;

const GRID_SIZE = 50;

let snake: Position[] = generateSnakePosition(GRID_SIZE);
let food: Position = generateFoodPosition(GRID_SIZE);
let direction: Direction = "right";
let gameInterval: number | undefined;
let gameSpeedDelay: number = 140;
let gameStarted: boolean = false;

const drawFood = () => {
  if (gameStarted) {
    const foodElement: HTMLElement = createElementOnBoard("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
  }
};

const drawSnake = () => {
  snake.forEach((segment: Position) => {
    const snakeElement: HTMLElement = createElementOnBoard("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
};

const setPosition = (element: HTMLElement, position: Position) => {
  element.style.gridColumn = `${position.x}`;
  element.style.gridRow = `${position.y}`;
};

const draw = () => {
  board.innerHTML = "";
  drawSnake();
  drawFood();
  updateScore();
};

const moveSnake = () => {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFoodPosition(GRID_SIZE);
    makeSnakeFaster();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      moveSnake();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
};

const handleKey = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowUp":
    case "W":
    case "w":
      direction = "up";
      break;
    case "ArrowDown":
    case "S":
    case "s":
      direction = "down";
      break;
    case "ArrowLeft":
    case "A":
    case "a":
      direction = "left";
      break;
    case "ArrowRight":
    case "D":
    case "d":
      direction = "right";
      break;
  }
};

const startGame = () => {
  if (!gameStarted) {
    gameStarted = true;
    logo.style.opacity = "0";
    buttonStart.style.display = "none";
    score.style.opacity = "1";
    gameInterval = setInterval(() => {
      moveSnake();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  }
};

const makeSnakeFaster = () => {
  if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 10;
  } else if (gameSpeedDelay > 80) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 35) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
};

const checkCollision = () => {
  const head = snake[0];

  if (head.x < 1 || head.x > GRID_SIZE || head.y < 1 || head.y > GRID_SIZE) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
};

const updateScore = () => {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(1, "0");
};

const resetGame = () => {
  clearInterval(gameInterval);
  gameStarted = false;
  score.style.opacity = "0";
  logo.style.opacity = "1";
  buttonStart.style.display = "block";
  snake = [{ x: 25, y: 25 }];
  food = generateFoodPosition(GRID_SIZE);
  direction = "right";
  gameSpeedDelay = 140;
  updateScore();
};

document.body.style.visibility = "visible";
document.addEventListener("keydown", handleKey);
buttonStart.addEventListener("click", startGame);
