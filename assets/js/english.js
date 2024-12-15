const questions = [
    {
        level: "easy",
        question: "Find adjective: The frightened little dog couldn't stop shivering.",
        answers: ["frightened", "stop", "dog", "shivering"],
        correct: 0,
        image: "assets/images/dog.jpg",
    },
    {
        level: "easy",
        question: "Find adjective: The forest was dark and spooky.",
        answers: ["forest", "dark", "and", "was"],
        correct: 1,
        image: "assets/images/forest.jpg",
    },
    {
        level: "easy",
        question: "Find adjective: The plant began to look brown and shrivelled after weeks without water.",
        answers: ["plant", "without", "shrivelled", "weeks"],
        correct: 2,
        image: "assets/images/plant.jpg",
    },
    {
        level: "easy",
        question: "Find adjective: The sound of the drill was terribly loud.",
        answers: ["sound", "drill", "terribly", "loud"],
        correct: 3,
        image: "assets/images/drill.jpg",
    },
    // Add more questions as needed
];

let currentQuestion = 0;
let filteredQuestions = [];

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const userName = getQueryParam('name');

function loadQuiz(level) {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = ''; // Clear previous quiz content
    filteredQuestions = questions.filter(q => q.level === level);
    filteredQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h1 class="text-center">${q.question}</h1>
            <div id="feedback-${index}" class="feedback text-center mt-3"></div>
            <div class="row">
                <div class="d-flex justify-content-center align-items-center col-12 col-md-4">
                    <img src="${q.image}" alt="Question Image" class="img-fluid mb-3">
                </div>
                <div class="col-md-8">
                    <div class="answers-container d-flex flex-wrap">
                        ${q.answers.map((answer, i) => `
                            <div class="col-12 col-md-6 p-2">
                                <div class="answer-card h2 p-2 d-flex justify-content-center align-items-center" onclick="selectAnswer(${index}, ${i}, this)">
                                    ${answer}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        quizDiv.appendChild(questionDiv);
    });
    showQuestion(currentQuestion);
}

function showQuestion(index) {
    const questions = document.querySelectorAll('.question');
    questions.forEach((question, i) => {
        question.style.display = i === index ? 'block' : 'none';
    });
    updateProgressBar(index, filteredQuestions.length);
}

function nextQuestion() {
    if (currentQuestion < document.querySelectorAll('.question').length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function selectAnswer(questionIndex, answerIndex, card) {
    const cards = document.querySelectorAll(`.question:nth-child(${questionIndex + 1}) .answer-card`);
    cards.forEach(card => card.classList.remove('selected', 'correct', 'incorrect'));
    card.classList.add('selected');
    const feedbackDiv = document.getElementById(`feedback-${questionIndex}`);
    if (answerIndex === filteredQuestions[questionIndex].correct) {
        card.classList.add('correct');
        feedbackDiv.innerHTML = `Fantastic job, ${encodeURIComponent(userName)}!`;
        feedbackDiv.style.color = '#4DB945'; // Green color for correct answer
    } else {
        card.classList.add('incorrect');
        cards[filteredQuestions[questionIndex].correct].classList.add('correct');
        feedbackDiv.innerHTML = `No worries, ${encodeURIComponent(userName)}!`;
        feedbackDiv.style.color = '#68AFFF'; // Blue color for incorrect answer
    }
}

function submitQuiz() {
    let score = 0;
    filteredQuestions.forEach((q, index) => {
        const selectedCard = document.querySelector(`.question:nth-child(${index + 1}) .answer-card.selected`);
        if (selectedCard) {
            const selectedAnswer = parseInt(selectedCard.dataset.selected);
            if (selectedAnswer === q.correct) {
                score++;
            }
        }
    });
    document.getElementById('score').innerText = `Your score is: ${score} / ${filteredQuestions.length}`;
    if (score === filteredQuestions.length) {
        document.getElementById('congratsMessage').style.display = 'block';
    }
    document.getElementById('playAgainBtn').style.display = 'inline';
}

function updateProgressBar(index, total) {
    const progress = document.getElementById('progress');
    const progressPercentage = ((index + 1) / total) * 100;
    progress.style.width = `${progressPercentage}%`;
}

function playAgain() {
    currentQuestion = 0;
    document.getElementById('score').innerText = '';
    document.getElementById('congratsMessage').style.display = 'none';
    document.getElementById('playAgainBtn').style.display = 'none';
    loadQuiz(document.querySelector('input[name="level"]:checked').value);
}

function selectLevel(level) {
    currentQuestion = 0;
    loadQuiz(level);
}

window.onload = () => {
    loadQuiz('easy'); // Default level
};