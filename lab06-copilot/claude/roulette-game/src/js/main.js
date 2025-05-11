let selectedNumber = null;
let roulette = null;

function init() {
    const spinButton = document.getElementById('spinButton');
    const numberInput = document.getElementById('numberInput');
    const resultDisplay = document.getElementById('resultDisplay');
    
    // Initialize the roulette with the canvas ID
    roulette = new Roulette('rouletteCanvas');
    
    // Draw the initial wheel
    roulette.drawWheel();
    
    spinButton.addEventListener('click', startGame);
}

function startGame() {
    const numberInput = document.getElementById('numberInput');
    const resultDisplay = document.getElementById('resultDisplay');
    
    selectedNumber = parseInt(numberInput.value);
    if (isNaN(selectedNumber) || selectedNumber < 0 || selectedNumber > 36) {
        alert('Please select a valid number between 0 and 36.');
        return;
    }
    
    resultDisplay.textContent = '';
    roulette.startSpin();
    
    // Check the result after spinning stops
    const checkInterval = setInterval(() => {
        if (!roulette.isSpinning && roulette.winningNumber !== null) {
            clearInterval(checkInterval);
            resultDisplay.textContent = roulette.winningNumber === selectedNumber ? 
                'You Win!' : 'You Lose! The winning number is ' + roulette.winningNumber;
        }
    }, 100);
}

window.onload = init;