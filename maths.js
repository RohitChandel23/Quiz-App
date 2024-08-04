const questions = [
    {
        question: "What is the unit of electrical resistance ?",
        answers: [
            { text: "Watt", correct: false},
            { text: "Volt", correct: false},
            { text: "Ampere", correct: false},
            { text: "Ohm", correct: true},
        ]
    },
    {
        question: "In which law does the formula F = ma appear, where F is force, m is mass and a is acceleration?",
        answers: [
            { text: "Newton's First Law", correct: false},
            { text: "Newton's Second Law", correct: true},
            { text: "Newton's Second Law", correct: false},
            { text: "Coulomb's Law", correct: false},
        ]
    },
    {
        question: "What is the SI unit of energy?",
        answers: [
            { text: "Joule", correct: true},
            { text: "Newton", correct: false},
            { text: "Watt", correct: false},
            { text: "Pascal", correct: false},
        ]
    },
    {
        question: "Which type of electromagnetic wave has the shortest wavelength?",
        answers: [
            { text: "Radio Waves", correct: false},
            { text: "Microwaves", correct: false},
            { text: "X-rays", correct: false},
            { text: "Gamma Rays", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();