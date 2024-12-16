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
let unansweredQuestions = [];
let originalTotalQuestions = 0;

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const userName = getQueryParam('name');

function loadQuiz(level) {
    currentLevel = level;
    currentQuestion = 0; // Ensure currentQuestion is set to 0 when a new level is loaded
    filteredQuestions = questions.filter(q => q.level === level);
    originalTotalQuestions = filteredQuestions.length; // Store the original total question count
    incorrectQuestions = []; // Reset incorrect questions for the new level
    unansweredQuestions = [...filteredQuestions]; // Initialize unanswered questions
    renderQuiz();
    resetProgressBar();
    updateLevelLabel();
    updateBackToSubjectsLink();
}

function renderQuiz() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = ''; // Clear previous quiz content
    filteredQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.style.display = index === currentQuestion ? 'block' : 'none'; // Ensure the first question is displayed
        questionDiv.innerHTML = `
            <h1 id="question" class="text-center">${q.question}</h1>
            <div id="feedback-${index}" class="feedback text-center mt-3"></div>
            <div class="row">
                <div class="d-flex justify-content-center align-items-center col-12 col-md-4">
                    <img src="${q.image}" alt="Question Image" class="img-fluid mb-3">
                </div>
                <div class="col-md-8">
                    <div class="answers-container d-flex flex-wrap">
                        ${q.answers.map((answer, i) => `
                            <div class="col-6 p-1 p-md-2">
                                <div class="answer-card h2 p-1 p-md-2 d-flex justify-content-center align-items-center" onclick="selectAnswer(${index}, ${i}, this)">
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

let totalWrongAttempts = 0;  // Track wrong attempts across all levels

// Keep track of wrong attempts for each level
let wrongAttemptsPerLevel = {
    easy: 0,
    medium: 0,
    hard: 0
};

let score = 1500; // Start with a perfect score of 1500
let pointsDeduction = 100; // Points deducted for each wrong attempt

function selectAnswer(questionIndex, answerIndex, card) {
    const cards = document.querySelectorAll(`.question:nth-child(${questionIndex + 1}) .answer-card`);
    cards.forEach(card => card.style.pointerEvents = 'none'); // Disable all answer buttons
    const feedbackDiv = document.getElementById(`feedback-${questionIndex}`);
    
    if (answerIndex === filteredQuestions[questionIndex].correct) {
        card.classList.add('correct');
        feedbackDiv.innerHTML = `Fantastic job, ${decodeURIComponent(userName)}!`;
        feedbackDiv.style.color = '#4DB945'; // Green color for correct answer
        correctAttempts++;
        updateProgressBar(); // Increment progress bar only on correct answer
        // Remove the question from incorrectQuestions and unansweredQuestions if it was previously answered incorrectly
        incorrectQuestions = incorrectQuestions.filter(q => q !== filteredQuestions[questionIndex]);
        unansweredQuestions = unansweredQuestions.filter(q => q !== filteredQuestions[questionIndex]);
    } else {
        card.classList.add('incorrect');
        feedbackDiv.innerHTML = `No worries, ${decodeURIComponent(userName)}!`;
        feedbackDiv.style.color = '#E94F3A'; // Red color for incorrect answer
        wrongAttempts++;
        wrongAttemptsPerLevel[currentLevel]++; // Increment wrong attempts for the current level
        totalWrongAttempts++;  // Increment total wrong attempts

        // Deduct points for the wrong attempt
        score -= pointsDeduction;

        // Add the wrongly answered question to the end of the queue if not already present
        if (!incorrectQuestions.some(q => q.question === filteredQuestions[questionIndex].question)) {
            incorrectQuestions.push(filteredQuestions[questionIndex]);
        }
        // Remove the question from unansweredQuestions
        unansweredQuestions = unansweredQuestions.filter(q => q !== filteredQuestions[questionIndex]);
    }

    // Update the progress bar after answering
    updateProgressBar();

    // Wait 2 seconds before showing the next question
    setTimeout(() => {
        if (currentQuestion < filteredQuestions.length - 1) {
            currentQuestion++; // Move to the next question
        } else if (unansweredQuestions.length > 0) {
            // Cycle through unanswered questions
            filteredQuestions = [...unansweredQuestions];
            currentQuestion = 0; // Restart at the first unanswered question
        } else if (incorrectQuestions.length > 0) {
            // Cycle through incorrectly answered questions
            filteredQuestions = [...incorrectQuestions];
            currentQuestion = 0; // Restart at the first incorrect question
        } else {
            handleLevelCompletion(); // Check if it's time to transition to the next level
            return;
        }
        renderQuiz();
    }, 2000);
}

function handleLevelCompletion() {
    if (correctAttempts === originalTotalQuestions) {
        if (currentLevel === 'easy') {
            showLevelUpMessage('medium');
        } else if (currentLevel === 'medium') {
            showLevelUpMessage('hard');
        } else {
            submitQuiz();
        }
    } else {
        currentQuestion = 0; // Reset to the first question
        filteredQuestions = [...incorrectQuestions]; // Use a copy of incorrectQuestions
        incorrectQuestions = [];  // Clear incorrect questions after moving forward
        renderQuiz();
    }
}

function updateProgressBar(isLastQuestion = false) {
    const progress = document.getElementById('progress');
    const progressIncrement = 100 / originalTotalQuestions; // Use original total question count
    const progressPercentage = isLastQuestion ? 100 : (correctAttempts * progressIncrement);
    progress.style.width = `${progressPercentage}%`;

    // Check if progress bar has reached 100%
    if (progressPercentage >= 100 && !isLastQuestion) {
        handleLevelCompletion();
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
            <div id="levelUpMessage" class="level-up-message h2 col-10 col-md-5 col-lg-7 col-xl-9 p-5">
                Excellent job, ${decodeURIComponent(userName)}!<br><br>Now let’s level up to ${nextLevel.charAt(0).toUpperCase() + nextLevel.slice(1)}!
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

function renderStarRating() {
    const maxStars = 5;
    const starRating = Math.max(0, Math.min(maxStars, Math.floor(score / 300))); // Use 'score' instead of 'totalScore'
    let starsHtml = '';

    for (let i = 0; i < maxStars; i++) {
        if (i < starRating) {
            starsHtml += '<span class="h1 star" style="color: #FFD722;">&#9733;</span>'; // Gold star
        } else {
            starsHtml += '<span class="h1 star" style="color: #EEEEEE;">&#9733;</span>'; // Grey star
        }
    }

    return `<div class="star-rating">${starsHtml}</div>`;
}

const subjectName = "English"; // Define the subject name

document.addEventListener('DOMContentLoaded', (event) => {
    const subjectTitleElement = document.getElementById('subject-title');
    if (subjectTitleElement) {
        subjectTitleElement.innerHTML = subjectName;
    }
});

function submitQuiz() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h1 class="h1 text-center">Well done, ${decodeURIComponent(userName)}!</h1>
        <h2 id="subject-name" class="subject-title h2 text-center">${subjectName}</h2> <!-- Add subject name here -->
        <div class="text-center">
            ${renderStarRating()}
        </div>
        <p class="text-center mb-1">Wrong Attempts: ${totalWrongAttempts}</p>
        <p id="final-score" class="text-center">Final Score: ${score}</p>
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

function calculatePercentage() {
    return (correctAttempts / originalTotalQuestions) * 100;
}

function getStarRating() {
    const percentage = calculatePercentage();
    let stars = '';

    // Determine the number of stars
    const starCount = Math.round(percentage / 20); // For 100%, it's 5 stars, for 80%, it's 4 stars, etc.
    
    // Create the stars
    for (let i = 0; i < 5; i++) {
        if (i < starCount) {
            stars += '<i class="fa-solid fa-star"></i>';  // Full star
        } else {
            stars += '<i class="fa-regular fa-star"></i>';  // Empty star
        }
    }

    return stars;
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