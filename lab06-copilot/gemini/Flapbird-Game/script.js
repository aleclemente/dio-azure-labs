const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const marioImage = new Image();
marioImage.src = 'super-mario-bros.png'; // Replace with the actual path to the Mario image

const gravity = 0.5;
const flapStrength = 8;
let isGameOver = false;

const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 106, // Adjust based on Mario image size
    height: 257, // Adjust based on Mario image size
    velocity: 0,
    flap: function() {
        this.velocity = -flapStrength;
    },
    update: function() {
        this.velocity += gravity;
        this.y += this.velocity;

        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            isGameOver = true;
        }
        if (this.y < 0) {
            this.y = 0;
        }
    },
    draw: function() {
        ctx.drawImage(marioImage, this.x, this.y, this.width, this.height);
    }
};

const pipes = [];
const pipeWidth = 50;
const pipeGap = 100;
let frame = 0;

function createPipe() {
    const pipeHeight = Math.random() * (canvas.height - pipeGap - 20) + 10;
    pipes.push({
        x: canvas.width,
        top: pipeHeight,
        bottom: canvas.height - pipeHeight - pipeGap
    });
}

function updatePipes() {
    if (frame % 90 === 0) {
        createPipe();
    }
    pipes.forEach(pipe => {
        pipe.x -= 2;
    });
    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
}

function detectCollision() {
    for (let pipe of pipes) {
        if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipeWidth) {
            if (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom) {
                isGameOver = true;
            }
        }
    }
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.update();
    bird.draw();
    updatePipes();
    drawPipes();
    detectCollision();

    if (!isGameOver) {
        frame++;
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isGameOver) {
        bird.flap();
    }
});

marioImage.onload = function() {
    gameLoop();
};