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

function loadQuiz(level) {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = ''; // Clear previous quiz content
    filteredQuestions = questions.filter(q => q.level === level);
    filteredQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <img src="${q.image}" alt="Question Image" class="img-fluid mb-3">
            <p>${q.question}</p>
        `;
        q.answers.forEach((answer, i) => {
            questionDiv.innerHTML += `
                <div class="answer-card" onclick="selectAnswer(${index}, ${i}, this)">${answer}</div>
            `;
        });
        quizDiv.appendChild(questionDiv);
    });
    showQuestion(currentQuestion);
}

function showQuestion(index) {
    const questionsDivs = document.querySelectorAll('.question');
    questionsDivs.forEach((div, i) => {
        div.style.display = i === index ? 'block' : 'none';
    });
    document.getElementById('prevBtn').style.display = index === 0 ? 'none' : 'inline';
    document.getElementById('nextBtn').style.display = index === questionsDivs.length - 1 ? 'none' : 'inline';
    document.getElementById('submitBtn').style.display = index === questionsDivs.length - 1 ? 'inline' : 'none';
    updateProgressBar(index, questionsDivs.length);
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
    cards.forEach(card => card.classList.remove('selected'));
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
    loadQuiz(document.querySelector('input[name="level"]:checked')?.value || 'easy');
}

function selectLevel(level) {
    currentQuestion = 0;
    loadQuiz(level);
}

window.onload = () => {
    loadQuiz('easy'); // Default level
};