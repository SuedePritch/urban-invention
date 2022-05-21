
var questionContainerEl = document.querySelector('.question-container')
var startButtonEl = document.getElementById('startButton')
var scoreScreenEl = document.querySelector('.score-screen')
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
let score = 0


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
        questionContainerEl.setAttribute('style', "display:none");
        scoreEl.textContent = `You got ${score} / ${questions.length}`
        scoreScreenEl.setAttribute('style', "display:block")
    }
    
}



function checkAnswer(answerIndex){
    if(answerIndex === questions[questionIndex].correct){
        console.log('correct');
        score++
        questionIndex++
    }else{
        questionIndex++
        console.log('wrong');
    }
    askQuestion();
}


function countdown() {
    var timeLeft = 20;
    var timeInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft > 9){
            countdownEl.textContent =  `0:${timeLeft}`;
        }else if(timeLeft >= 1){
            countdownEl.textContent = `0:0${timeLeft}`;
        }else{
            countdownEl.textContent = '0:00'
            clearInterval(timeInterval);
        }
        },1000);
}



function runQuiz(){
    //Set button text
    startButtonEl.textContent = 'Start Quiz'
    //start button event
    startButtonEl.addEventListener("click", function() {
        countdown();
        //hides button
        startButtonEl.setAttribute('style', "display:none");
        //displays question container
        questionContainerEl.setAttribute('style', "display:block");
        questionContainerEl.addEventListener("click", function(event) {
            var element = event.target;
            if(element.matches('.answer')){
                var answerIndex = parseInt(element.dataset.indexanswer)
                checkAnswer(answerIndex);
            }
        })
        askQuestion();
    });
    
}
runQuiz();