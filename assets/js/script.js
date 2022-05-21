
var questionContainerEl = document.querySelector('.question-container')
var startButtonEl = document.getElementById('startButton')

var scoreScreenEl = document.querySelector('.score-screen')
var correctAnswersEl = document.getElementById('correctAnswers')
var scoreEl = document.getElementById('score')

var countdownEl = document.querySelector('.countdown')

var questionEl = document.getElementById('question')
var answer0El = document.getElementById('answer0')
var answer1El = document.getElementById('answer1')
var answer2El = document.getElementById('answer2')
var answer3El = document.getElementById('answer3')

//list of questions - correct answers are index of answers array
var questions = [
    {
        question: "Whats up",
        answers:["Nothing Much","Doing Well", "Studying","Chillin"],
        correct: 1
    },
    {
        question: "Whats up2",
        answers:["Nothing Much2","Doing Well2", "Studying2","Chillin2"],
        correct: 2
    },
    {
        question: "Whats up3",
        answers:["Nothing Much3","Doing Well3", "Studying3","Chillin3"],
        correct: 0
    },
    {
        question: "Whats up4",
        answers:["Nothing Much4","Doing Well4", "Studying4","Chillin4"],
        correct: 3
    }
]
let questionIndex = 0;
let correctAnswers = 0;
let score = 0;

//Need to be the same value
var totalTime = 10; 
var timeLeft = totalTime;


function loadQuestion(questionIndex){
    questionEl.textContent = `${questions[questionIndex].question}`
    answer0El.textContent = `${questions[questionIndex].answers[0]}`
    answer1El.textContent = `${questions[questionIndex].answers[1]}`
    answer2El.textContent = `${questions[questionIndex].answers[2]}`
    answer3El.textContent = `${questions[questionIndex].answers[3]}`
}



function askQuestion(){
    if(questionIndex < questions.length){
        loadQuestion(questionIndex)
    }else{
        scoreScreen();
    }
    
}



function checkAnswer(answerIndex){
    if(answerIndex === questions[questionIndex].correct){
        correctAnswers++
        questionIndex++
    }else{
        questionIndex++;
        timeLeft - 5;
    }
    askQuestion();
}


function scoreScreen(){
    questionContainerEl.setAttribute('style', "display:none");
    scoreScreenEl.setAttribute('style', "display:block")
    correctAnswersEl.textContent = `You got ${correctAnswers} / ${questions.length}`
    score = timeLeft * correctAnswers * 100
    scoreEl.textContent = `Score: ${score}`;
    countdownEl.textContent = `${timeLeft} seconds remaining`
}


function countdown() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        if(score){
            clearInterval(timeInterval)
        }else if (timeLeft > 99){
            countdownEl.textContent =  `${timeLeft} seconds`;
        }else if (timeLeft > 9){
            countdownEl.textContent =  `0:${timeLeft}`;
        }else if(timeLeft >= 1){
            countdownEl.textContent = `0:0${timeLeft}`;
        }else{
            clearInterval(timeInterval);
            scoreScreen();
        }
        },1000);
}



function runQuiz(){
    countdownEl.textContent = `You have ${totalTime} seconds to finish`
    //Set button text
    startButtonEl.textContent = 'Start Quiz'
    //start button event
    startButtonEl.addEventListener("click", function() {
        countdown();
        //hides button
        startButtonEl.setAttribute('style', "display:none");
        //displays question container
        questionContainerEl.setAttribute('style', "display:block");
        // answer click event
        questionContainerEl.addEventListener("click", function(event) {
            var element = event.target;
            if(element.matches('.answer')){
                var answerIndex = parseInt(element.dataset.indexanswer)
                checkAnswer(answerIndex);
            }
        })
        //show first question
        askQuestion();
    });
    
}
runQuiz();