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
        answers: ["My sister is not very good at sports.", "What time is it?" ,"The moon is beautiful.", 
                   "Mountain climbing is an exciting activity."],
        correct: 1,
        image: "assets/images/mountain.jpg",
    },
    {
        level: "hard",
        question: "Which one of the following is an opinion?",
        answers: ["The gallery is free to enter.", "The sun is shining.", "Clouds are grey.", "The train is late."],
        correct: 1,
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
        answers: ["Is it Friday today?", "Rugby is more enjoyable than football.", "The sun is not shinning.", "Stop shouting!"],
        correct: 1,
        image: "assets/images/rugby.jpg",
    },
];


let currentQuestion = 0;
let filteredQuestions = [];
let correctAttempts = 0;
let wrongAttempts = 0;
let currentLevel = 'easy';
let incorrectQuestions = [];
let originalTotalQuestions = 0;

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const userName = getQueryParam('name');

function loadQuiz(level) {
    currentLevel = level;
    currentQuestion = 0; // Make sure to set it to 0 to start with the first question
    filteredQuestions = questions.filter(q => q.level === level);
    originalTotalQuestions = filteredQuestions.length; // Store the original total question count
    incorrectQuestions = []; // Reset incorrect questions for the new level
    console.log(filteredQuestions); // Debugging line to check the filtered questions
    
    // Render the first question only when the quiz is loaded
    renderQuiz(); 
    
    resetProgressBar();
    updateLevelLabel();
    updateBackToSubjectsLink();
}




function renderQuiz() {
    console.log(`Rendering question ${currentQuestion}`); // Log to verify the current question index

    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = ''; // Clear previous quiz content

    // Render only the current question based on `currentQuestion`
    filteredQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.style.display = index === currentQuestion ? 'block' : 'none'; // Only display the current question
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
    
    // Handle correct answer
    if (answerIndex === filteredQuestions[questionIndex].correct) {
        card.classList.add('correct');
        feedbackDiv.innerHTML = `Fantastic job, ${decodeURIComponent(userName)}!`;
        feedbackDiv.style.color = '#4DB945'; // Green color for correct answer
        correctAttempts++;
        // Remove the question from incorrectQuestions if it was previously answered incorrectly
        incorrectQuestions = incorrectQuestions.filter(q => q !== filteredQuestions[questionIndex]);
    } else { // Handle incorrect answer
        card.classList.add('incorrect');
        feedbackDiv.innerHTML = `No worries, ${decodeURIComponent(userName)}!`;
        feedbackDiv.style.color = '#E94F3A'; // Red color for incorrect answer
        wrongAttempts++;
        // Add the wrongly answered question to the end of the queue if not already present
        if (!incorrectQuestions.some(q => q.question === filteredQuestions[questionIndex].question)) {
            incorrectQuestions.push(filteredQuestions[questionIndex]);
        }
    }

    // Update the progress bar after answering
    updateProgressBar();

    // Wait 2 seconds before showing the next question
    setTimeout(() => {
        if (currentQuestion < filteredQuestions.length - 1) {
            currentQuestion++; // Move to the next question after user interaction
        } else if (incorrectQuestions.length > 0) {
            // Cycle through incorrectly answered questions
            filteredQuestions = incorrectQuestions;
            currentQuestion = 0; // Restart at the first incorrect question
        } else {
            handleLevelCompletion(); // Check if it's time to transition to the next level
            return;
        }
        renderQuiz(); // Update the quiz UI after each question is answered
    }, 2000);
}


function handleLevelCompletion() {
    // Check if all the questions are correctly answered
    if (correctAttempts === originalTotalQuestions) {
        // Display a level-up message and transition to the next level
        if (currentLevel === 'easy') {
            showLevelUpMessage('medium');
        } else if (currentLevel === 'medium') {
            showLevelUpMessage('hard');
        } else {
            submitQuiz(); // Quiz completed after "hard" level
        }
    } else {
        // Reset to the first question and cycle through incorrectly answered questions
        currentQuestion = 0;
        filteredQuestions = incorrectQuestions; // Focus on incorrect questions
        incorrectQuestions = [];  // Clear incorrect questions after moving forward
        renderQuiz();
    }
}



function updateProgressBar() {
    const progress = document.getElementById('progress');
    const progressIncrement = 100 / originalTotalQuestions; // Use original total question count
    const progressPercentage = (correctAttempts * progressIncrement);
    progress.style.width = `${progressPercentage}%`;

    // Automatically trigger level completion when progress reaches or exceeds 100%
    if (progressPercentage >= 100) {
        handleLevelCompletion(); // Transition to the next level
    }
}


function resetProgressBar() {
    const progress = document.getElementById('progress');
    if (progress) {
        progress.style.width = '0%';
    } else {
        console.error('Progress element not found');
    }
}

function updateLevelLabel() {
    const levelLabel = document.getElementById('levelLabel');
    if (levelLabel) {
        levelLabel.textContent = `${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}`;
    } else {
        console.error('Level label element not found');
    }
}

function updateBackToSubjectsLink() {
    const backToSubjectsBtn = document.getElementById('backToSubjectsBtn');
    if (backToSubjectsBtn) {
        backToSubjectsBtn.href = `category.html?name=${encodeURIComponent(userName)}`;
    } else {
        console.error('Back to Subjects button not found');
    }
}

function showLevelUpMessage(nextLevel) {
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
        gameContainer.innerHTML += `
            <div id="levelUpMessage" class="level-up-message">
                Excellent job, ${decodeURIComponent(userName)}!<br>Now let’s level up to ${nextLevel.charAt(0).toUpperCase() + nextLevel.slice(1)}!
            </div>
        `;
        setTimeout(() => {
            document.getElementById('levelUpMessage').remove();
            correctAttempts = 0; // Reset correct attempts for new level
            resetProgressBar(); // Reset progress bar
            loadQuiz(nextLevel); // Load the next level
        }, 2000);
    } else {
        console.error('Game container element not found');
    }
}

function submitQuiz() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h1 class="h1 text-center">Quiz Completed!</h1>
        <p class="text-center">Correct Attempts: ${correctAttempts}</p>
        <p class="text-center">Wrong Attempts: ${wrongAttempts}</p>
        <div class="text-center">
            <button id="playAgainBtn" class="btn btn-primary" onclick="playAgain()">Play Again!</button>
            <a id="backToSubjectsBtn" href="category.html?name=${encodeURIComponent(userName)}" class="btn btn-link mt-4">
                ← Back to Subjects
            </a>
            <a id="backToSubjectsBtn" href="category.html?name=${encodeURIComponent(userName)}" class="btn btn-lg rounded-circle position-absolute top-0 end-0 m-3 m-md-5">
                <i class="fa-solid fa-xmark"></i>
            </a>
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