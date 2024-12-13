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
    loadQuiz(document.querySelector('input[name="level"]:checked').value);
}

function selectLevel(level) {
    currentQuestion = 0;
    loadQuiz(level);
}

window.onload = () => {
    loadQuiz('easy'); // Default level
};