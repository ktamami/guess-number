"use strict";

// Define what is written many times with function
const messageUpdate = function (message) {
  document.querySelector(".message").textContent = message;
};

// Define a secret number
const defineNewNumber = function () {
  const answer = Math.trunc(Math.random() * 20) + 1;
  return answer;
};

// Decrease the score from initial 20 points to 0
// The 20 is named state variable (application state written in HTML)
let currentScore = 20;
const decreaseScore = function (score) {
  if (score > 0) {
    score--;
    document.querySelector(".score").textContent = score;
  }
  return score;
};

// Check score is 0 and game over or not
const checkScore = function (score, answer) {
  if (!score) {
    messageUpdate("🤷‍♀️ You lost");
    document.querySelector(".number").textContent = answer;
  }
};

// Reset the game
const resetGame = function () {
  currentScore = 20;
  answer = defineNewNumber();
  document.querySelector(".number").textContent = "?";
  messageUpdate("Start guessing...");
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".score").textContent = currentScore;
  return answer, currentScore;
};

// Update the high score
let highScore = 0;
const updateHighscore = function (score) {
  if (score > highScore) {
    highScore = score;
    document.querySelector(".highscore").textContent = score;
  }
};

// Check guess
const checkGuess = function () {
  // If blank will be returned, it'll be 0 (falsy value) because we convert string to number.
  const guess = Number(document.querySelector(".guess").value);
  if (guess > 20 || guess <= 0) {
    messageUpdate("❌ No number");
  } else if (guess === answer) {
    messageUpdate("🎉 Correct Number!");
    document.querySelector(".number").textContent = answer;
    document.querySelector("body").style.backgroundColor = "#60b347";
    updateHighscore(currentScore);
  } else if (guess !== answer) {
    currentScore = decreaseScore(currentScore);
    messageUpdate(guess > answer ? "📈 Too high" : "📉 Too low");
    checkScore(currentScore, answer);
  }
};

let answer = defineNewNumber();
document.querySelector(".check").addEventListener("click", checkGuess);
document.querySelector(".again").addEventListener("click", resetGame);
