document.getElementById('nameInput').addEventListener('input', function() {
    const nameInput = document.getElementById('nameInput');
    const submitButton = document.querySelector('.btn-primary');
    if (nameInput.value.trim() !== '') {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});


////logic for maths quiz



const questions = [
    { question: "What is 5 plus 3?", answers: [6, 7, 8, 9], correct: 2 },
    { question: "What is 10 minus 4?", answers: [5, 6, 7, 8], correct: 1 },
    { question: "What is 3 multiplied by 3?", answers: [6, 7, 8, 9], correct: 3 },
    { question: "What is 12 divided by 4?", answers: [2, 3, 4, 5], correct: 1 }
];

let currentQuestion = 0;

function loadQuiz() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = ''; // Clear previous quiz content
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${q.question}</p>`;
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
    document.getElementById('nextBtn').style.display = index === questions.length - 1 ? 'none' : 'inline';
    document.getElementById('submitBtn').style.display = index === questions.length - 1 ? 'inline' : 'none';
    updateProgressBar(index);
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
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
    if (answerIndex === questions[questionIndex].correct) {
        card.classList.add('correct');
    } else {
        card.classList.add('incorrect');
        cards[questions[questionIndex].correct].classList.add('correct');
    }
}

function submitQuiz() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedCard = document.querySelector(`.question:nth-child(${index + 1}) .answer-card.selected`);
        if (selectedCard) {
            const selectedAnswer = parseInt(selectedCard.dataset.selected);
            if (selectedAnswer === q.correct) {
                score++;
            }
        }
    });
    document.getElementById('score').innerText = `Your score is: ${score} / ${questions.length}`;
    document.getElementById('playAgainBtn').style.display = 'inline';
}

function updateProgressBar(index) {
    const progress = document.getElementById('progress');
    const progressPercentage = ((index + 1) / questions.length) * 100;
    progress.style.width = `${progressPercentage}%`;
}

function playAgain() {
    currentQuestion = 0;
    document.getElementById('score').innerText = '';
    document.getElementById('playAgainBtn').style.display = 'none';
    loadQuiz();
}

window.onload = loadQuiz;
=======
function redirectToCategory() {
    const nameInput = document.getElementById('nameInput').value.trim();
    if (nameInput !== '') {
        window.location.href = `category.html?name=${encodeURIComponent(nameInput)}`;
    }
}

