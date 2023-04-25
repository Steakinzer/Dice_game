'use strict';
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const scorePlayer1 = document.querySelector('#score--0');
const scorePlayer2 = document.querySelector('#score--1');
const currentPlayer1 = document.querySelector('#current--0');
const currentPlayer2 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const backPlayer1 = document.querySelector('.player--0');
const backPlayer2 = document.querySelector('.player--1');

class Player {
  constructor(name) {
    this.name = name;
    this.total = 0;
    this.score = 0;
  }
  addScore(dice) {
    this.score += dice;
  }
  resetScore() {
    this.score = 0;
  }
  addTotal() {
    this.total += this.score;
  }
  resetTotal() {
    this.total = 0;
  }
  isWinning() {
    if (this.total >= 20) {
      return true;
    }
  }
  resetPlayer() {
    this.score = 0;
    this.total = 0;
  }
}
let player1 = new Player('Joueur 1');
let player2 = new Player('Joueur 2');

function diceRoll() {
  dice.style.display = 'block';
  let diceValue = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${diceValue}.png`;
  return diceValue;
}

function resetScore() {
  currentPlayer1.textContent = 0;
  currentPlayer2.textContent = 0;
}
function resetContent() {
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  resetScore();
  rollDice.style.display = 'block';
  backPlayer1.classList.remove('player--winner');
  backPlayer2.classList.remove('player--winner');
}

function displayTotal() {
  currentPlayer == player1
    ? (scorePlayer1.textContent = player1.total)
    : (scorePlayer2.textContent = player2.total);
}

function displayScore() {
  currentPlayer == player1
    ? (currentPlayer1.textContent = player1.score)
    : (currentPlayer2.textContent = player2.score);
}

function displayScoreAndTotal() {
  displayTotal();
  displayScore();
}
function winningColor() {
  currentPlayer == player1
    ? backPlayer1.classList.add('player--winner')
    : backPlayer2.classList.add('player--winner');
}
let currentPlayer;
function initGame() {
  resetContent();
  currentPlayer = player1;
  player1.resetPlayer();
  player2.resetPlayer();
  dice.style.display = 'none';
}
initGame();

rollDice.addEventListener('click', playing);
hold.addEventListener('click', holding);
newGame.addEventListener('click', initGame);

function switchPlayer() {
  currentPlayer.resetScore();
  displayScore();
  currentPlayer == player1
    ? (currentPlayer = player2)
    : (currentPlayer = player1);
  backPlayer1.classList.toggle('player--active');
  backPlayer2.classList.toggle('player--active');
}
function addingScore(dice) {
  currentPlayer == player1 ? player1.addScore(dice) : player2.addScore(dice);
  displayScore();
}
function playing() {
  let currentDice = diceRoll();
  currentDice === 1 ? switchPlayer() : addingScore(currentDice);
}

function holding() {
  currentPlayer.addTotal();
  if (currentPlayer.isWinning()) {
    winningColor();
    displayTotal();
    rollDice.style.display = 'none';
    dice.style.display = 'none';
    resetScore();
  } else {
    displayScoreAndTotal();
    switchPlayer();
  }
}
