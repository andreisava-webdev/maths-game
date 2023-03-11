var seconds = 10;
var timer;

var displayQuestion = function (question) {
  $('.question').html(`<p>${question}</p>`);
};

var generateQuestion = function () {
  var firstNumber = Math.floor(Math.random() * 10 + 1);
  var secondNumber = Math.floor(Math.random() * 10 + 1);

  var text = `${firstNumber} + ${secondNumber}`;
  var answer = firstNumber + secondNumber;

  displayQuestion(text);

  return { text, answer };
};

var question = generateQuestion();

$('#userAnswer').on('input', function () {
  var userAnswer = $(this).val();

  if (parseFloat(userAnswer) === question.answer) {
    seconds++;
    updateTimer();
    question = generateQuestion();
    displayQuestion(question.text);
    $(this).val('');
  }
});

var updateTimer = function () {
  if (seconds === 0) {
    clearInterval(timer);
    $('#userAnswer').attr('disabled', true);
  }
  $('.timer').html(seconds);
};

var startGame = function () {
  updateTimer();
  timer = setInterval(function () {
    seconds--;
    updateTimer();
  }, 1000);
};

startGame();
