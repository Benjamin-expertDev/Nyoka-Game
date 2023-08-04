const boardSize = 20;
const snakeSpeed = 150; // Adjust this value to control the snake speed

let snake = [{ x: 10, y: 10 }]; // Snake initial position
let food = generateRandomFood();

let dx = 0;
let dy = 0;
let isGameOver = false;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const keyPressed = event.key;
    switch (keyPressed) {
        case 'ArrowUp':
            dx = 0;
            dy = -1;
            break;
        case 'ArrowDown':
            dx = 0;
            dy = 1;
            break;
        case 'ArrowLeft':
            dx = -1;
            dy = 0;
            break;
        case 'ArrowRight':
            dx = 1;
            dy = 0;
            break;
    }
}

function generateRandomFood() {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    return { x, y };
}

function drawBoard() {
    const boardElement = document.querySelector('.game-board');
    boardElement.innerHTML = '';

    // Draw snake
    snake.forEach(segment => {
        const snakeCell = document.createElement('div');
        snakeCell.classList.add('snake-cell');
        snakeCell.style.gridRowStart = segment.y + 1;
        snakeCell.style.gridColumnStart = segment.x + 1;
        boardElement.appendChild(snakeCell);
    });

    // Draw food
    const foodCell = document.createElement('div');
    foodCell.classList.add('food-cell');
    foodCell.style.gridRowStart = food.y + 1;
    foodCell.style.gridColumnStart = food.x + 1;
    boardElement.appendChild(foodCell);
}

function updateGame() {
    if (isGameOver) return;

    // Update snake position
    const newHead = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    snake.unshift(newHead);

    // Check for collision with food
    if (newHead.x === food.x && newHead.y === food.y) {
        food = generateRandomFood();
    } else {
        snake.pop();
    }

    // Check for collision with walls or itself
    if (
        newHead.x < 0 || newHead.x >= boardSize ||
        newHead.y < 0 || newHead.y >= boardSize ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
        isGameOver = true;
        alert('Game Over!');
    }

    drawBoard();
}

setInterval(updateGame, snakeSpeed);
