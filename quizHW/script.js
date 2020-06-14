$(document).ready(function () {
  console.log("ready!");

  var startQuizBtn = $("#startquiz");
  var quiz = $("#quiz");
  var title = document.getElementById("question");
  var timer = document.querySelector("#timer");
  var results = $("#results");
  var points = $("#points");
  var submit = $("#submit");
  var initials = $("#initials");

  var questions = [
    {
      question:
        "What is the name of the secret society Albus Dumbledore founded?",
      answers: ["Order of the bird", "Butterbeer", "Order of the pheonix"],
      correctAnswer: "Order of the pheonix",
    },
    {
      question: "what is the name of Harry Potters aunt?",
      answers: ["Magnolia Dursley", "Petunia Dursley", "Daisy Dursley"],
      correctAnswer: "Petunia Dursley",
    },

    {
      question: "Who is Harry Potters God Father?",
      answers: ["Mr. Weasley", "Hagrid", "Sirius Black"],
      correctAnswer: "Sirius Black",
    },
    {
      question: "What creature was living in the chamber of secrets?",
      answers: ["Giant Spider", "Manticore", "Basalisk"],
      correctAnswer: "Basalisk",
    },
  ];

  var score = 4;
  var questionNumber = 0;
  var result = localStorage.getItem("result");
  results.textContent = result;
  // var userAns = "";
  var timeLeft;
  var time = questions.length * 15;
  var choices = document.querySelector("#choices");

  function startQuiz() {
    // start timer ticks every 1 second
    timeLeft = setInterval(clockTick, 1000);
    // show starting time
    timeLeft.textContent = time;
    // function that get a question for you
    getQuestion();
  }

  function getQuestion() {
    // get current question object from array
    var q = questions[questionNumber];
    title.textContent = q.question;
    console.log(q.question);
    choices.innerHTML = "";
    for (var i = 0; i < 3; i++) {
      var a = q.answers[i];
      //value a is button. create buttn,
      var button = document.createElement("button");
      button.setAttribute("value", a);
      //use text contnt to give value q answers i.
      button.textContent = a;
      button.onclick = questionClick;
      //then append button to div called choices all in this loop. generating abc, buttons to select answer

      choices.appendChild(button);
    }
    // done
  }
  function endQuiz() {
    // stop timer
    clearInterval(timeLeft);
    quiz.css("display", "none");
    points.text(score);
    results.css("display", "");

    // TODO:
    // show end screen
    // show final score
    // hide questions section
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
  //timerEl.textContent = totalseconds;
  // check if user ran out of time
  //if (time <= 0) {
  //End the quiz
  //endQuiz();
  //}}

  function questionClick() {
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

  function saveScore() {
    var j = initials.value;
    var s = score.value;
    window.localStorage.setItem("initials", j);
    window.localStorage.setItem("score", s);
    alert("it works");
  }
  submit.click(saveScore);
  startQuizBtn.click(startQuiz);
});
