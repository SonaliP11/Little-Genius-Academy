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
    level: "easy",
    question: "",
    answers: [1, 3, 2, 5],
    correct: 0,
    image: "assets/images/Maths4.png"
},

    {
        level: "esay",
        question: "You have 12 cookies, and you want to share them equally among 4 friends. How many cookies does each friend get?",
        answers: ["six", "seven", "eight", "three"],
        correct: 3,
        image: "assets/images/maths6.png"
    },
    {
        level: "medium",
        question: "What is the missing term in this sequence? 5, 11, ___,23, 29?",
        answers: ["16", "17", "18", "20"],
        correct: 1,
        image: "assets/images/maths7.png"
    },
    {
        level: "medium",
        question: "What is the rule for this sequence? 99, 96, 93, 90, 87?",
        answers: ["Add 3", "subtact 2", "subtract 3", "Add 2"],
        correct: 2,
        image: "assets/images/maths8.png"
    },
    {
        level: "medium",
        question: "Would 75 be in this sequence? 44,51,58,65",
        answers: ["True", "False"],
        correct: 1,
        image: "assets/images/maths9.png"
    },
    {
        level: "medium",
        question: "What is the missing term in this sequence? 12,24,48, ___,192",
        answers: ["nighty-six", "fifty-six", "seventy-two", "hundred-and-twenty"],
        correct: 0,
        image: "assets/images/maths10.png"
    },
    {
        level: "medium",
        question: "True or false? The seventh term in this sequence is 24?,3, 4, 6, 9, 13,__",
        answers: ["True", "False"],
        correct: 0,
        image: "assets/images/maths11.png"
    },
    {
        level: "hard",
        question: "What time is shown on the clock?",
        answers: ["11:10", "11:20", "11:30", "11:40"],
        correct: 2,
        image: "assets/images/maths12.png"
    },
    {
        level: "hard",
        question: "What time is shown on the clock?",
        answers: ["7:25", "7:20", "7:35", "8:00"],
        correct: 0,
        image: "assets/images/maths13.png"
    },
    {
        level: "hard",
        question: "What time is shown on the clock?",
        answers: ["8:40", "9:45", "9:40", "7:55"],
        correct: 0,
        image: "assets/images/maths14.png"
    },
    {
        level: "hard",
        question: "Which clock shows the time twenty to five?",
        answers: ["a", "b", "c"],
        correct: 1,
        image: "assets/images/maths15.png"
    },
    {
        level: "hard",
        question: "How many minutes are there between twenty-five to nine and five to nine?",
        answers: ["25", "10", "15", "20"],
        correct: 3,
        image: "assets/images/maths16.png"
    }
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

const subjectName = "Maths"; // Define the subject name

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
        <h2 id="subject-name" class="h2 text-center">${subjectName}</h2> <!-- Add subject name here -->
        <div class="text-center">
            ${renderStarRating()}
        </div>
        <p class="text-center">Wrong Attempts: ${totalWrongAttempts}</p>
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