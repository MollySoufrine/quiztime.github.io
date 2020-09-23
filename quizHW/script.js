$(document).ready(function () {
  console.log("ready!");

  (function () {
    init();
    function Question(question, answer, correct) {
      this.question = question;
      this.answer = answer;
      this.correct = correct;
    }
    Question.prototype.displayQuestion = function () {
      title.textContent = this.question;

      choices.innerHTML = "";
      for (var i = 0; i < 3; i++) {
        var a = this.answer;

        var button = document.createElement("button");
        button.setAttribute("value", a);
        
        button.textContent = a;
        button.onclick = questionClick;
        //then append button to div called choices all in this loop. generating abc, buttons to select answer

        choices.appendChild(button);
      }
    };
    var q1 = new Question(
      "What is the name of the secret society Albus Dumbledore founded?",
      ["Order of the bird", "Butterbeer", "Order of the pheonix"],
      2
    );

    var q2 = new Question(
      "what is the name of Harry Potters aunt?",
      ["Magnolia Dursley", "Petunia Dursley", "Daisy Dursley"],
      1
    );

    var q3 = new Question(
      "Who is Harry Potters God Father?",
      ["Mr. Weasley", "Hagrid", "Sirius Black"],
      2
    );
    function score() {
      var sc = 0;
      return function (correct) {
        if (correct) {
          sc++;
        }
        return sc;
      };
      
    }
    var keepScore = score()


  function endQuiz() {
    // stop timer
    clearInterval(timeLeft);
    quiz.css("display", "none");
    points.text(score);
    results.css("display", "");
  }

  // function that keep track of time
  function clockTick() {
    // update time
    time--;
    timer.textContent = time;
    if (time <= 0) {
      endQuiz();
    }
  }
  function nextQuestion() {
    var n = Math.floor(Math.random() * questions.length);
    questions[n].displayQuestion();
    var answer = prompt('Please select the correct answer.');
    if(answer !== 'exit') {
        questions[n].checkAnswer(parseInt(answer), keepScore);
        
        nextQuestion();
    }
}

nextQuestion();

  function checkIfWrong(){
    switch(){

    }
  }
    // check if user guessed wrong

    if (this.value !== questions[questionNumber].correctAnswer) {
      // penalize time
      time -= 5;
      //console.log(this.value + " = " + questions[questionNumber].correctAnswer);
      score--;
      // points.text(score);

      if (time < 0) {
        time = 0;
      }

      alert("Wrong!");
    } else {
      alert("Correct!");
    }

    // display new time on page
    // timerEl.textContent = timeLeft;

    // move to next question
    questionNumber++;

    // check if we've run out of questions
    if (questionNumber === questions.length) {
      endQuiz();
    } else {
      getQuestion();
    }
  }


function init() {
  var score = 0;
  var questionNumber = 0;
  var result = localStorage.getItem("result");
  results.textContent = result;

  var timeLeft;
  var time = questions.length * 15;
  var choices = document.querySelector("#choices");
  // start timer ticks every 1 second
  timeLeft = setInterval(clockTick, 1000);
  // show starting time
  timeLeft.textContent = time;
  // function that gets a question for you
  var startQuizBtn = $("#startquiz");
  var quiz = $("#quiz");
  var title = document.getElementById("question");
  var timer = document.querySelector("#timer");
  var results = $("#results");
  var points = $("#points");
  var submit = $("#submit");
  var initials = $("#initials");
}
