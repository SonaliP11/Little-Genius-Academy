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
        answers: ["Add 3", "subtact 2", "subtract 3", "nAdd 2"],
        correct: 2,
        image: "assets/images/maths8.png"
    },
    {
        level: "medium",
        question: "Would 75 be in this sequence? 44,51,58,65",
        answers: ["fourteen", "fifteen", "sixteen", "seventeen"],
        correct: 2,
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
        question: "True or false? The seventh term in this sequence is 24?,3, 4, 6, 9, 13.__",
        answers: ["True", "False"],
        correct: 0,
        image: "assets/images/maths11.png"
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

function loadQuiz(level) {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = ''; // Clear previous quiz content
    filteredQuestions = questions.filter(q => q.level === level);
    filteredQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h1>${q.question}</h1>
            <div class="row">
                <div class="col-md-4">
                    <img src="${q.image}" alt="Question Image" class="img-fluid mb-3">
                </div>
                <div class="col-md-8">
                    <div class="answers-container d-flex flex-wrap">
                        ${q.answers.map((answer, i) => `
                            <div class="col-12 col-md-6 p-2">
                                <div class="answer-card p-2 d-flex justify-content-center align-items-center" onclick="selectAnswer(${index}, ${i}, this)">
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
    card.dataset.selected = answerIndex;

    // Highlight correct and incorrect answers
    if (answerIndex === filteredQuestions[questionIndex].correct) {
        card.classList.add('correct');
    } else {
        card.classList.add('incorrect');
        cards[filteredQuestions[questionIndex].correct].classList.add('correct');
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