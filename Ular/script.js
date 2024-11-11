const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = "RIGHT";
let food = {};
let score = 0; // Skor awal
let game; // Variable untuk menyimpan interval game
let speed = 100; // Kecepatan awal

function startGame() {
    snake = [{ x: 9 * box, y: 9 * box }];
    direction = "RIGHT";
    score = 0;
    speed = 105; // Reset kecepatan
    document.getElementById("scoreBoard").innerText = "Skor: " + score; // Reset skor
    createFood();
    
    // Mulai game
    if (game) clearInterval(game); // Clear interval jika ada game yang sedang berjalan
    game = setInterval(draw, speed);
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode === 38 && direction !== "DOWN") {
        direction = "UP";
    } else if (event.keyCode === 39 && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode === 40 && direction !== "UP") {
        direction = "DOWN";
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move snake in the current direction
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Check if the snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++; // Tambah skor
        document.getElementById("scoreBoard").innerText = "Skor: " + score; // Update skor

        createFood();

        // Tingkatkan kecepatan setiap kali makanan dimakan
        speed *= 0.8; // Meningkatkan kecepatan dengan mengurangi interval
        clearInterval(game); // Hentikan interval lama
        game = setInterval(draw, speed); // Mulai ulang dengan kecepatan baru

        // Menambah panjang ular
        snake.push({});
        
    } else {
        // Remove the tail
        snake.pop();
    }

    // Add new head
    const newHead = { x: snakeX, y: snakeY };

   // Game over conditions
   if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
       clearInterval(game);
       alert("Game Over! Skor Anda adalah: " + score);
       return;
   }

   snake.unshift(newHead);
}

// Event listener untuk tombol mulai game
document.getElementById("startButton").addEventListener("click", startGame);