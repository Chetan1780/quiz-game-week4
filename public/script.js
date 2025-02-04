// Write your code from here!!
let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;

async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:3000/questions');
        questions = await response.json();
        showQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

function startTimer() {
    timeLeft = 10;
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrectAnswer();
            moveToNextQuestion();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    clearInterval(timer);
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(option, optionElement);
        optionsContainer.appendChild(optionElement);
    });

    startTimer();
}

function showCorrectAnswer() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        if (option.textContent === questions[currentQuestion].answer) {
            option.classList.add('correct');
        }
    });
}

function selectOption(selectedOption, element) {
    clearInterval(timer);
    const isCorrect = selectedOption === questions[currentQuestion].answer;
    
    if (isCorrect) {
        element.classList.add('correct');
        score++;
    } else {
        element.classList.add('incorrect');
        showCorrectAnswer();
    }

    // Disable all options after selection
    document.querySelectorAll('.option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });

    setTimeout(moveToNextQuestion, 1000);
}

function moveToNextQuestion() {
    currentQuestion++;
    setTimeout(() => showQuestion(), 500);
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.textContent = `Quiz completed! Your score: ${score}/${questions.length}`;
}

fetchQuestions();