'use strict';

// selecting the  element
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const currentScoreLeft = document.querySelector('#current--0');
const currentScoreRight = document.querySelector('#current--1');
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

// creating variable
let score, currentScore, activePlayer, playing;
const newGame = function () {
  // starting
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = '0';
  score1El.textContent = '0';
  currentScoreLeft.textContent = '0';
  currentScoreRight.textContent = '0';

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
newGame(); // we need to call this frist to strart the new game

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle is to remove if it is there and to add if it is not
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// for Roll Dice button
btnRoll.addEventListener('click', function () {
  // to stop the button after the player wins
  if (playing) {
    // changiing the dice png
    diceEl.classList.remove('hidden');
    let diceRoll = Math.trunc(Math.random() * 6 + 1);
    // console.log(diceRoll);
    if (diceRoll === 1) {
      diceEl.src = `dice-1.png`;
    } else if (diceRoll === 2) {
      diceEl.src = `dice-2.png`;
    } else if (diceRoll === 3) {
      diceEl.src = `dice-3.png`;
    } else if (diceRoll === 4) {
      diceEl.src = `dice-4.png`;
    } else if (diceRoll === 5) {
      diceEl.src = `dice-5.png`;
    } else if (diceRoll === 6) {
      diceEl.src = `dice-6.png`;
    }
    // We can also use
    // let diceRoll = Math.trunc(Math.random() * 6 + 1);
    // diceEl.src = `dice-${diceRoll}.png`;

    // Changing players
    currentScore = currentScore + diceRoll;
    if (diceRoll === 1) {
      switchPlayer();
    } else {
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      activePlayer = activePlayer === 0 ? 0 : 1;
      // score[activePlayer] = currentScore;
    }
  }
});

// for hold button
btnhold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      // to stop
      diceEl.classList.add('hidden');
      playing = false;
      // for winner
      {
        activePlayer = activePlayer === 0 ? 0 : 1;
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
      }
      // for player looser
      {
        activePlayer = activePlayer === 0 ? 1 : 0;
        // document
        //   .querySelector(`.player--${activePlayer}`)
        //   .classList.add('player--looser');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
      }
    } else {
      // switching players
      switchPlayer();
    }
  }
});

// for New Game
btnNew.addEventListener('click', newGame);
// {
//     // document.location.reload(); new to call a function in order to make this code work
// });
