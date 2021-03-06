//Button Handles
var startButtonEl = document.getElementById('startButton')
var playAgainButtonEl = document.getElementById('play-again')
var saveHighScoreButtonEl = document.getElementById('save-score')
var saveScoreWithInitialsButtonEl = document.getElementById('save-score-with-initials')


//Score Screen Handles
var correctAnswersEl = document.getElementById('correctAnswers')
var scoreScreenEl = document.querySelector('.score-screen')
var scoreEl = document.getElementById('score')
var finshedInSecondsEL = document.getElementById('test-time-completed')




//High Score Screen
var highscoreLinkEl = document.querySelector('.high-scores')
var highscoreTakeQuizEl = document.querySelector('#take-quiz')
var highscoreScreenEl = document.querySelector('.highscore-screen')
//get highscores and if there are none in local storage load default scores
//this is done so the array isnt null when pushing newHighscore
let highscores = JSON.parse(localStorage.getItem('highscores'))|| 
[
    {initials:'JEBP', score:12290},
    {initials:'LRS', score:12230},
    {initials:'TTG', score:11240},
    {initials:'RBF', score:11190},
    {initials:'MSM', score:11120},
    {initials:'LUNA', score:10460},
    {initials:'GREG', score:10262},
    {initials:'TimC', score:9260},
    {initials:'MIKE', score:8290},
    {initials:'BAI', score:6290},
    {initials:'MLC', score:290},
    {initials:'JED', score:290},
];

var initials = document.querySelector('#userName')
var userInputEl = document.querySelector('.userInput')


//Timer Element Handle
var countdownEl = document.querySelector('.countdown')

//Question Elements Handles
var questionContainerEl = document.querySelector('.question-container')
var questionEl = document.getElementById('question')
var answer0El = document.getElementById('answer0')
var answer1El = document.getElementById('answer1')
var answer2El = document.getElementById('answer2')
var answer3El = document.getElementById('answer3')

//list of questions - correct answers are index of answers array
var questions = [
    {
        question: "Which is NOT a Javascript data type",
        answers:["Number","Boolean", "Object","DOM"],
        correct: 3
    },
    {
        question: "What is === operator?",
        answers:["Equal","Concurrent","Equal in value", "Equal in value and type"],
        correct: 3
    },
    {
        question: "Adding Javascript to a HTML page uses the _____ tag",
        answers:["<script>","<link>", "<head>","<javascript>"],
        correct: 0
    },
    {
        question: "What is the difference between an alert and a confirm prompt?",
        answers:["Both the same","Confirm allows text input", "Alert is informational, Confirm asks cancel/ok","Alert allows text input"],
        correct: 2
    }
]

//Global variables


let questionIndex = 0;
let correctAnswers = 0;
let score = 0;

//set time limit for test in seconds
//display countdown timer
var totalTime = 60; 
var timeLeft = totalTime;
countdownEl.textContent = `You have ${totalTime} seconds to finish`

//invoked in askQuestion()
//provides the text content from the questions object
//questionIndex is a number
//questionIndex is the question number we want to display - zero based
function loadQuestion(questionIndex){
    questionEl.textContent = `${questions[questionIndex].question}`
    answer0El.textContent = `${questions[questionIndex].answers[0]}`
    answer1El.textContent = `${questions[questionIndex].answers[1]}`
    answer2El.textContent = `${questions[questionIndex].answers[2]}`
    answer3El.textContent = `${questions[questionIndex].answers[3]}`
}


//invoked in checkAnswer(), startButtonEl, and playAgainButtonEl
//displays question container
//loads a question if there are questions left
//loads scorescreen when all questions completed 
function askQuestion(){
    questionContainerEl.setAttribute('style', "display:block");
    if(questionIndex < questions.length){
        loadQuestion(questionIndex)
    }else{
        scoreScreen();
    }
    
}


//takes in answerIndex from question-container event
//answerIndex is a number representing index of answers array
//checks if answer chosen is the correct answer
//increments correctAnswers used in score calculation in scoreScreen() if correct
//marks question complete by incrementing questionIndex
//time penalty if incorrect
//one answer attempt per question
//adds animation for correct and wrong answers
//reruns askQuestion for next question or scorescreen
//ensures userInput is displayed as it is hidden if view high scores is pressed
function checkAnswer(answerIndex){
    var selectedAnswerDivHelper = `answer${answerIndex}`
    var selectedAnswerDivEl = document.getElementById(selectedAnswerDivHelper)
    if(answerIndex === questions[questionIndex].correct){
        selectedAnswerDivEl.classList.add('correct-animation')
        correctAnswers++
        questionIndex++  
    }else{
        selectedAnswerDivEl.classList.add('wrong-animation')
        questionIndex++;
        timeLeft -= 10;
    }
    setTimeout(() => {
        selectedAnswerDivEl.classList.remove('correct-animation')
        selectedAnswerDivEl.classList.remove('wrong-animation')
        userInputEl.setAttribute('style', "display:flex");
        askQuestion();
    }, "300")
}

//invoked in countdown() and askQuestion() 
//This hides the quiz then displays scorescreen.
//Shows how many questions user got correct out of the total number of questions
//Score is calculated based on num of correct answers and time remaining
//Shows user how many seconds were left when test was finished
function scoreScreen(){
    questionContainerEl.setAttribute('style', "display:none");
    scoreScreenEl.setAttribute('style', "display:block")
    correctAnswersEl.textContent = `You got ${correctAnswers} / ${questions.length}`
    finshedInSecondsEL.textContent = `You completed the test in ${totalTime - timeLeft} seconds`
    score = timeLeft * correctAnswers * 57
    scoreEl.textContent = `Score: ${score}`;
    if(timeLeft > 1){
        countdownEl.textContent = `${timeLeft} seconds remaining`
    }else if (timeLeft == 1){
        countdownEl.textContent = `${timeLeft} second remaining`
    }else{
        countdownEl.textContent = "No Time Left"
    }
}

//invoked in saveHighcoreButtonEl, view highscore link
//retireves high scores from localstorage
//iterates through highscore array displaying textContent for each list item  
//the id on list items is highscoreIndex0 through highscoreIndex11
//total of 12 list items
function loadHighScores(){
    for(i=0; i < highscores.length && i < 12; i++){
        document.querySelector(`#highscoreIndex${i}`).textContent = `${highscores[i].score} ${highscores[i].initials}` ;
    }
}

//sorts highscores in decending order
function sortHighscores(a,b){
    return b.score - a.score
}

//Countdown timer adjusts message based on time left and ends game when timer runs out
function countdown() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        if(score){
            clearInterval(timeInterval)
        }else if (timeLeft > 99){
            countdownEl.textContent =  `${timeLeft} seconds`;
        }else if (timeLeft > 9){
            countdownEl.textContent =  `TIME: 0:${timeLeft}`;
        }else if(timeLeft >= 1){
            countdownEl.textContent = `TIME: 0:0${timeLeft}`;
        }else{
            clearInterval(timeInterval);
            highscoreScreenEl.setAttribute('style', 'display:none');
            highscoreTakeQuizEl.setAttribute('style', 'display:none')
            scoreScreen();
        }
        },1000);
}

//Event Listeners
//link in nav bar
//hides previous elements
//displays score screen and takequiz button
highscoreLinkEl.addEventListener('click', function(){
    scoreScreenEl.setAttribute('style', 'display:none');
    questionContainerEl.setAttribute('style', 'display:none');
    startButtonEl.setAttribute('style', "display:none");
    userInputEl.setAttribute('style', "display:none");

    highscoreScreenEl.setAttribute('style', 'display:flex');
    highscoreTakeQuizEl.setAttribute('style', 'display:flex')
    loadHighScores();

})


//start button event
//starts timer
//hides button
//shows first question
startButtonEl.addEventListener("click", function() {
    countdown();
    startButtonEl.setAttribute('style', "display:none");
    askQuestion();
    
});
//similar to start button
//hide previous elements
highscoreTakeQuizEl.addEventListener("click", function() {
    highscoreScreenEl.setAttribute('style', 'display:none');
    countdown();
    startButtonEl.setAttribute('style', "display:none");
    askQuestion();
    
});

// determines which answer is clicked. provides chosen answer to checkAnswer()
//answerIndex is a number representing index of answers array
questionContainerEl.addEventListener("click", function(event) {
    var element = event.target;
    if(element.matches('.answer')){
        var answerIndex = parseInt(element.dataset.indexanswer)
        checkAnswer(answerIndex);
    }
})

//play again button event
//hide scorescreen
//clear progress
//restart countdown
//show first question
playAgainButtonEl.addEventListener("click", function() {
    scoreScreenEl.setAttribute('style', "display:none")
    questionIndex = 0
    correctAnswers = 0
    score = 0
    timeLeft = totalTime
    countdown();
    askQuestion();
});

//hide scorescreen
//display recent highscores, current score with input for initials and save button
//ensures userInput is displayed as it is hidden if view high scores is pressed
saveHighScoreButtonEl.addEventListener('click', function(){
    scoreScreenEl.setAttribute('style', 'display:none');
    highscoreTakeQuizEl.setAttribute('style', 'display:none')
    userInputEl.setAttribute('style', 'display:flex')
    highscoreScreenEl.setAttribute('style', 'display:flex');
    loadHighScores();
})

//Update highscore array with current score and initials
//newHighscore captures initails from #userName input
//disables save high score button if score doesnt make top 12
//disables if current score has been entered
//adds current score to array
//runs sort and removes the lowest score if all 12 list items are filled
saveScoreWithInitialsButtonEl.addEventListener('click', function(event){
    event.preventDefault();
    var newHighscore = {
        initials: initials.value,
        score: score
    }
    if(score < highscores[11].score){
        saveScoreWithInitialsButtonEl.setAttribute('disabled','true')
        saveScoreWithInitialsButtonEl.textContent = 'GIT GUD'
    }
    highscores.push(newHighscore);
    highscores.sort(sortHighscores);
    saveScoreWithInitialsButtonEl.setAttribute('disabled','true')
    if(highscores.length == 13){
        highscores.pop()
    }
    localStorage.setItem('highscores', JSON.stringify(highscores));
    loadHighScores();
    
})
