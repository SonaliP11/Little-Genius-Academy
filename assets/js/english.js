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
    {
        level: "easy",
        question: "Find adjective: The Queen lived in a grand palace.",
        answers: ["Queen", "lived", "grand", "palace"],
        correct: 2,
        image: "assets/images/queen.jpg",
    },
    {
        level: "medium",
        question: "Find adverb: He shouted loudly for help.",
        answers: ["shouted", "loudly", "for", "help"],
        correct: 1,
        image: "assets/images/shout.jpg",
    },
    {
        level: "medium",
        question: "Find adverb: She tried hard, but failed to hit the target.",
        answers: ["tried", "hard", "failed", "hit"],
        correct: 1,
        image: "assets/images/target.jpg",
    },
    {
        level: "medium",
        question: "Find adverb: She whispered the secret carefully into her best friend's ear.",
        answers: ["whispered", "carefully", "secret", "best"],
        correct: 1,
        image: "assets/images/whisper.jpg",
    },
    {
        level: "medium",
        question: "Find adverb: The team played poorly because many players were injured.",
        answers: ["team", "played", "poorly", "injured"],
        correct: 2,
        image: "assets/images/team.jpg",
    },
    {
        level: "medium",
        question: "Find adverb: Slipping on the treacherous ice, my sister landed awkwardly.",
        answers: ["slipping", "treacherous", "awkwardly", "landed"],
        correct: 2,
        image: "assets/images/ice.jpg",
    },
    {
        level: "hard",
        question: "Which one of the following expresses an opinion?",
        answers: ["Is it Friday today?", "My cousin's name is Edward.", "Hot chocolate is delicious.", "Stop shouting!"],
        correct: 2,
        image: "assets/images/chocolate.jpg",
    },
    {
        level: "hard",
        question: "Which one of the following is NOT an opinion?",
        answers: ["My sister is not very good at sports.", "What time is it?" ,"The moon is beautiful", 
                   "Mountain climbing is an exciting activity."],
        correct: 3,
        image: "assets/images/mountain.jpg",
    },
    {
        level: "hard",
        question: "Which one of the following is an opinion?",
        answers: ["The gallery is free to enter.", "The sun is shining.", "Clouds are grey", "The train is late."],
        correct: 0,
        image: "assets/images/art.jpg",
    },
    {
        level: "hard",
        question: "Which one of the following is a fact?",
        answers: ["Mondays are boring.", "What time is it?", "How old are you?", "A sundial uses the position of the sun to show the time of day."],
        correct: 3,
        image: "assets/images/moon.jpg",
    },
    {
        level: "hard",
        question: "Which one of the following expresses an opinion?",
        answers: ["Is it Friday today?", "Rugby is more enjoyable than football.", "The sun is not shinning", "Stop shouting!"],
        correct: 1,
        image: "assets/images/rugby.jpg",
    },
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
    updateLevelLabel();
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

function updateLevelLabel() {
    const levelLabel = document.getElementById('levelLabel');
    levelLabel.textContent = `${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}`;
}

function updateBackToSubjectsLink() {
    const backToSubjectsBtn = document.getElementById('backToSubjectsBtn');
    backToSubjectsBtn.href = `category.html?name=${encodeURIComponent(userName)}`;
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
    updateBackToSubjectsLink(); // Ensure the link is updated after the DOM is loaded and userName is set
};