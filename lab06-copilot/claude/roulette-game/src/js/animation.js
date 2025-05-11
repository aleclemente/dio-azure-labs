// Wait for DOM to be fully loaded before accessing canvas
let canvas, ctx;

window.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('rouletteCanvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
    }
});

function drawRouletteWheel(angles, radius) {
    for (let i = 0; i < angles.length; i++) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, angles[i], angles[i + 1]);
        ctx.fillStyle = i % 2 === 0 ? '#FF0000' : '#000000';
        ctx.fill();
        ctx.stroke();
    }
}

function animateBall(ball, angle, speed) {
    const gravity = 0.1;
    const friction = 0.99;

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRouletteWheel(ball.angles, ball.radius);
        
        ball.angle += speed;
        speed *= friction; // Apply friction

        ball.x = canvas.width / 2 + ball.radius * Math.cos(ball.angle);
        ball.y = canvas.height / 2 + ball.radius * Math.sin(ball.angle);

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.stroke();

        if (speed > 0.01) {
            requestAnimationFrame(update);
        }
    }

    update();
}

// No need for export, functions will be globally available