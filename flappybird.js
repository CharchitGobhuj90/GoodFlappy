// Select the canvas
let board = document.getElementById("board");
let boardWidth = window.innerWidth; // Full width of the viewport
let boardHeight = window.innerHeight; // Full height of the viewport
board.width = boardWidth;
board.height = boardHeight;
let context = board.getContext("2d");

// Bird properties
let birdWidth = 34; // Adjust as needed
let birdHeight = 24; 
let birdX = boardWidth / 8; // Position the bird on the left
let birdY = boardHeight / 2; // Center the bird vertically
let birdImg = new Image();
birdImg.src = "./flappybird.png";

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

// Pipe properties
let pipeArray = [];
let pipeWidth = 64; 
let pipeHeight = boardHeight / 2; // Dynamically adjust pipe height
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg = new Image();
topPipeImg.src = "./toppipe.png";
let bottomPipeImg = new Image();
bottomPipeImg.src = "./bottompipe.png";

// Game properties
let gravity = 2;
let velocity = 0;
let gameRunning = false;
let score = 0;

// Start game on spacebar or click
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") startGame();
});
board.addEventListener("click", startGame);

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        setInterval(update, 20);
    }
    velocity = -10; // Makes the bird "jump"
}

// Game update loop
function update() {
    // Clear the canvas
    context.clearRect(0, 0, boardWidth, boardHeight);

    // Draw the bird
    bird.y += velocity;
    velocity += gravity; // Gravity effect
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Draw and update pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x -= 5; // Move pipes to the left

        // Draw top pipe
        context.drawImage(topPipeImg, pipe.x, pipe.y, pipe.width, pipe.height);

        // Draw bottom pipe
        context.drawImage(bottomPipeImg, pipe.x, pipe.y + pipe.height + 150, pipe.width, boardHeight);

        // Detect collision
        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.y + pipe.height || bird.y + bird.height > pipe.y + pipe.height + 150)
        ) {
            alert("Game Over! Your score: " + score);
            document.location.reload();
        }

        // Remove off-screen pipes and add new ones
        if (pipe.x + pipe.width < 0) {
            pipeArray.splice(i, 1);
            score++;
        }
    }

    // Add pipes at intervals
    if (pipeArray.length === 0 || pipeArray[pipeArray.length - 1].x < boardWidth - 300) {
        let randomHeight = Math.random() * (boardHeight / 2);
        pipeArray.push({
            x: boardWidth,
            y: randomHeight - pipeHeight,
            width: pipeWidth,
            height: pipeHeight
        });
    }

    // Check if bird hits the ground
    if (bird.y + bird.height > boardHeight) {
        alert("Game Over! Your score: " + score);
        document.location.reload();
    }

    // Display the score
    context.fillStyle = "white";
    context.font = "20px Courier";
    context.fillText("Score: " + score, 10, 30);
}
