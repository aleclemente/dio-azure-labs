const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');

const numbers = Array.from({ length: 36 }, (_, i) => i + 1);
const colors = ['red', 'black', 'green'];
const chosenNumberInput = document.getElementById('chosenNumber');
const spinButton = document.getElementById('spinButton');
let chosenNumber = null;

function drawRouletteWheel() {
    const wheelRadius = canvas.height / 2;
    const angleStep = (2 * Math.PI) / numbers.length;

    for (let i = 0; i < numbers.length; i++) {
        const angle = i * angleStep;
        ctx.beginPath();
        ctx.moveTo(wheelRadius, wheelRadius);
        ctx.arc(wheelRadius, wheelRadius, wheelRadius, angle, angle + angleStep);
        ctx.fillStyle = colors[i % 2 === 0 ? 0 : 1];
        ctx.fill();
        ctx.stroke();
        
        ctx.save();
        ctx.translate(wheelRadius, wheelRadius);
        ctx.rotate(angle + angleStep / 2);
        ctx.fillStyle = 'white';
        ctx.fillText(numbers[i], wheelRadius / 2, 10);
        ctx.restore();
    }
}

function spinRoulette() {
    chosenNumber = parseInt(chosenNumberInput.value);
    if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 36) {
        alert('Please choose a valid number between 1 and 36.');
        return;
    }

    const spinDuration = 3000; // 3 seconds
    const spinAngle = Math.random() * 360 + 720; // Random spin + 2 full rotations
    const startTime = performance.now();

    function animateSpin(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        const currentAngle = spinAngle * progress;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(wheelRadius, wheelRadius);
        ctx.rotate((currentAngle * Math.PI) / 180);
        ctx.translate(-wheelRadius, -wheelRadius);
        drawRouletteWheel();
        ctx.restore();

        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            determineResult(currentAngle);
        }
    }

    requestAnimationFrame(animateSpin);
}

function determineResult(finalAngle) {
    const finalPosition = (finalAngle % 360) / (360 / numbers.length);
    const winningNumber = Math.round(finalPosition) % numbers.length;
    const resultNumber = numbers[winningNumber];

    if (resultNumber === chosenNumber) {
        alert(`Congratulations! The ball landed on ${resultNumber}. You win!`);
    } else {
        alert(`The ball landed on ${resultNumber}. Better luck next time!`);
    }
}

spinButton.addEventListener('click', spinRoulette);
drawRouletteWheel();