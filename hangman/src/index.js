import Hangman from './hangman';
import getPuzzle from './request';

const puzzleEl = document.querySelector('#puzzle');
const messageEl = document.querySelector('#message');
let game;

window.addEventListener('keypress', (e) => {
    const guess = e.key;
    game.makeGuess(guess);
    render();
});

const render = () => {
    puzzleEl.innerHTML = '';
    messageEl.textContent = game.statusMessage;

    game.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span');
        letterEl.textContent = letter;
        puzzleEl.appendChild(letterEl);
    });;
}

const startGame = async () => {
    const puzzle = await getPuzzle('3');
    game = new Hangman(puzzle, 5);
    render();
}

document.querySelector('#reset').addEventListener('click', startGame);

startGame();

// getPuzzle('3').then((puzzle) => {
//     console.log(puzzle);
// }).catch((error) => {
//     console.error(error);
// });

// getCountry('CO').then((country) => {
//     console.log(country.name.common);
//     console.log(country.name.official);
// }).catch((error) => {
//     console.error(error);
// });

// getLocation().then(location => {
//     console.log(`You're currently in ${location.city} (${location.region}), ${location.country}!`);
//     return getCountry(location.country);
// }).then((country) => {
//     console.log(country.name.common);
//     console.log(country.name.official);
// }).catch((error) => {
//     console.error(error);
// });