# Roulette Game

Welcome to the Roulette Game! This project is a simple implementation of a casino-style roulette game using HTML, CSS, and JavaScript. The game simulates the experience of playing roulette, where players can choose a number and spin the wheel to see if they win.

## Features

- Interactive roulette wheel that spins and randomly selects a number.
- Realistic physics simulation for the ball's movement on the wheel.
- Sound effects for spinning the wheel, ball rolling, and winning.
- User-friendly interface for selecting numbers and starting the game.

## Getting Started

To run the Roulette Game locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd roulette-game
   ```

2. **Open the `index.html` file:**
   You can open the `src/index.html` file in your web browser to start playing the game.

3. **Dependencies:**
   This project does not require any additional dependencies. Just ensure you have a modern web browser.

## File Structure

- `src/index.html`: Main HTML document for the game.
- `src/css/style.css`: Styles for the game layout and animations.
- `src/js/main.js`: Entry point for JavaScript functionality.
- `src/js/roulette.js`: Logic for spinning the roulette wheel.
- `src/js/physics.js`: Physics simulation for the wheel and ball.
- `src/js/animation.js`: Animation handling for the game elements.
- `src/assets/sounds/`: Contains sound files for game effects.

## Contributing

If you would like to contribute to the Roulette Game, feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is open-source and available under the MIT License.

## Copilot Script

@workspace /new criar um jogo de roleta estilo os que tem em cassinos no qual é escolhido um número, a roleta é girada e uma bola é lançada nela. Se a bola cair no número esclolhido então ganha o jogo. A velocidade e a rotação devem seguir as leis da física no planeta terra. Utilize html, css, javascript, canva para criar as formas e a animação.

## Correction Script
Corrigir os erros encontrados no browser:
physics.js:1 Uncaught SyntaxError: Unexpected token 'export'Understand this error
animation.js:43 Uncaught SyntaxError: Unexpected token 'export'Understand this error
roulette.js:63 Uncaught SyntaxError: Unexpected token 'export'Understand this error
main.js:2 Uncaught TypeError: Cannot read properties of null (reading 'getContext')
at main.js:2:20