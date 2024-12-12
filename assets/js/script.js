let questions = [
    {
      question: "2 + 2 = ?",
      answer: 4
    },
    {
      question: "5 - 1 = ?",
      answer: 4
    },
    {
      question: "7 * 3 = ?",
      answer: 21
    },
    {
      question: "10 / 2 = ?",
      answer: 5
    },
    {
      question: "9 - 4 = ?",
      answer: 5
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  document.getElementById("question").innerHTML = questions[currentQuestion].question;
  
  document.getElementById("submit").addEventListener("click", checkAnswer);
  
  function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer").value);
    if (userAnswer === questions[currentQuestion].answer) {
      score++;
      document.getElementById("result").innerHTML = "Correct!";
    } else {
      document.getElementById("result").innerHTML = "Incorrect. The correct answer is " + questions[currentQuestion].answer;
    }
  
    currentQuestion++;
    if (currentQuestion >= questions.length) {
      document.getElementById("question").innerHTML = "Quiz finished!";
      document.getElementById("answer").disabled = true;
      document.getElementById("submit").disabled = true;
      document.getElementById("result").innerHTML = "Your final score is " + score + "/" + questions.length;
    } else {
      document.getElementById("question").innerHTML = questions[currentQuestion].question;
      document.getElementById("answer").value = "";
      document.getElementById("result").innerHTML = "";
    }
  
    let progressBarWidth = (currentQuestion / questions.length) * 100;
    document.getElementById("progress-bar-inner").style.width = progressBarWidth + "%";
  }