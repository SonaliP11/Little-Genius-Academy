const questions = [
{
    level: "easy",
    question: "How many chocolates in total?",
    answers: [5, 14, 16, 20],
    correct: 2,
    image: "assets/images/maths1.png"
},
{
    level: "easy",
    question: "What is the total shown on the two dice?",
    answers: [5, 7, 6, 8],
    correct: 1,
    image: "assets/images/maths2.png"
},
{
    level: "easy",
    question: "How many dogs in total?",
    answers: [5, 7, 6, 8],
    correct: 0,
    image: "assets/images/maths3.png"
},
    {
        level: "medium",
        question: "What is three multiplied by three?",
        answers: ["six", "seven", "eight", "nine"],
        correct: 3,
        image: "assets/images/medium1.png"
    },
    {
        level: "medium",
        question: "What is twelve divided by four?",
        answers: ["two", "three", "four", "five"],
        correct: 1,
        image: "assets/images/medium2.png"
    },
    {
        level: "medium",
        question: "What is fifteen minus seven?",
        answers: ["six", "seven", "eight", "nine"],
        correct: 2,
        image: "assets/images/medium3.png"
    },
    {
        level: "medium",
        question: "What is eight multiplied by two?",
        answers: ["fourteen", "fifteen", "sixteen", "seventeen"],
        correct: 2,
        image: "assets/images/medium4.png"
    },
    {
        level: "hard",
        question: "What is fifteen plus twenty-seven?",
        answers: ["thirty-two", "forty-two", "fifty-two", "sixty-two"],
        correct: 0,
        image: "assets/images/hard1.png"
    },
    {
        level: "hard",
        question: "What is one hundred forty-four divided by twelve?",
        answers: ["ten", "eleven", "twelve", "thirteen"],
        correct: 2,
        image: "assets/images/hard2.png"
    }
];

let currentQuestion = 0;
let filteredQuestions = [];
let correctAttempts = 0;
let wrongAttempts = 0;
let currentLevel = 'easy';

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const userName = getQueryParam('name');

function loadQuiz(level) {
    currentLevel = level;
    currentQuestion = 0;
    filteredQuestions = questions.filter(q => q.level === level);
    renderQuiz();
    resetProgressBar();
}

function renderQuiz() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = ''; // Clear previous quiz content
    filteredQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.style.display = index === currentQuestion ? 'block' : 'none';
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
}

function selectAnswer(questionIndex, answerIndex, card) {
    const cards = document.querySelectorAll(`.question:nth-child(${questionIndex + 1}) .answer-card`);
    cards.forEach(card => card.style.pointerEvents = 'none'); // Disable all answer buttons
    const feedbackDiv = document.getElementById(`feedback-${questionIndex}`);
    
    if (answerIndex === filteredQuestions[questionIndex].correct) {
        card.classList.add('correct');
        feedbackDiv.innerHTML = `Fantastic job, ${encodeURIComponent(userName)}!`;
        feedbackDiv.style.color = '#4DB945'; // Green color for correct answer
        correctAttempts++;
    } else {
        card.classList.add('incorrect');
        feedbackDiv.innerHTML = `No worries, ${encodeURIComponent(userName)}!`;
        feedbackDiv.style.color = '#E94F3A'; // Red color for incorrect answer
        wrongAttempts++;
    }

    setTimeout(() => {
        if (currentQuestion < filteredQuestions.length - 1) {
            currentQuestion++;
            renderQuiz();
            updateProgressBar();
        } else {
            handleLevelCompletion();
        }
    }, 2000);
}

function handleLevelCompletion() {
    updateProgressBar(true); // Ensure progress bar reaches 100% for the last question
    if (currentLevel === 'easy') {
        showLevelUpMessage('medium');
    } else if (currentLevel === 'medium') {
        showLevelUpMessage('hard');
    } else {
        submitQuiz();
    }
}

function updateProgressBar(isLastQuestion = false) {
    const progress = document.getElementById('progress');
    const progressIncrement = 100 / filteredQuestions.length;
    const progressPercentage = isLastQuestion ? 100 : currentQuestion * progressIncrement;
    progress.style.width = `${progressPercentage}%`;
}

function resetProgressBar() {
    const progress = document.getElementById('progress');
    progress.style.width = '0%';
}

function showLevelUpMessage(nextLevel) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML += `
        <div id="levelUpMessage" class="level-up-message">
            Excellent job, ${encodeURIComponent(userName)}!<br>Now let’s level up!
        </div>
    `;
    setTimeout(() => {
        document.getElementById('levelUpMessage').remove();
        loadQuiz(nextLevel);
    }, 2000);
}

function submitQuiz() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h1 class="text-center">Quiz Completed!</h1>
        <p class="text-center">Correct Attempts: ${correctAttempts}</p>
        <p class="text-center">Wrong Attempts: ${wrongAttempts}</p>
        <div class="text-center">
            <button id="playAgainBtn" class="btn btn-primary" onclick="playAgain()">Play Again!</button>
        </div>
    `;
}

function playAgain() {
    location.reload(); // Refresh the page to start the game again
}

function selectLevel(level) {
    correctAttempts = 0;
    wrongAttempts = 0;
    loadQuiz(level);
}

window.onload = () => {
    loadQuiz('easy'); // Default level
};