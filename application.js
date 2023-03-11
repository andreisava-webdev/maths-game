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

var toggleQuestion = function () {
  $('.question').toggleClass('d-none');
};

var toggleRestartBtn = function () {
  $('.restartBtn').toggleClass('d-none');
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
    $('#userAnswer').attr('disabled', true);
    toggleQuestion();
    toggleRestartBtn();
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
displayTimer();

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

$('.restartBtn').on('click', function () {
  seconds = 10;
  question = generateQuestion();
  displayTimer();
  displayQuestion(question.text);
  toggleQuestion();
  toggleRestartBtn();
  $('#userAnswer').attr('disabled', false);
});
