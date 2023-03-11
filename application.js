var currentScore = 0;
var highScore = 0;
var seconds = 10;
var timer;
var gameStarted = false;

var displayCurrentScore = function () {
  $('.currentScore').html(currentScore);
};

var displayHighScore = function () {
  $('.highScore').html(highScore);
};

var displayQuestion = function (question) {
  $('.question').html(`<p>${question}</p>`);
};

var displayTimer = function () {
  $('.timer').html(seconds);
};

displayCurrentScore();
displayHighScore();

var generateQuestion = function () {
  var firstNumber = Math.floor(Math.random() * 10 + 1);
  var secondNumber = Math.floor(Math.random() * 10 + 1);

  var text = `${firstNumber} + ${secondNumber}`;
  var answer = firstNumber + secondNumber;

  displayQuestion(text);

  return { text, answer };
};

var updateTimer = function () {
  if (seconds === 0) {
    clearInterval(timer);
    highScore = currentScore;
    currentScore = 0;
    displayCurrentScore();
    displayHighScore();
    gameStarted = false;
    seconds = 10;
  }
  displayTimer();
};

var startGame = function () {
  gameStarted = true;
  updateTimer();
  timer = setInterval(function () {
    seconds--;
    updateTimer();
  }, 1000);
};

var question = generateQuestion();
updateTimer();

$('#userAnswer').on('input', function () {
  if (!gameStarted) {
    startGame();
  }

  var userAnswer = $(this).val();

  if (parseFloat(userAnswer) === question.answer) {
    currentScore++;
    displayCurrentScore();
    seconds++;
    updateTimer();
    question = generateQuestion();
    displayQuestion(question.text);
    $(this).val('');
  }
});
