//Button Handles
var startButtonEl = document.getElementById('startButton')
var playAgainButtonEl = document.getElementById('play-again')
var saveHighScoreButtonEl = document.getElementById('save-score')
var saveScoreWithInitialsButtonEl = document.getElementById('save-score-with-initials')


//Score Screen Handles
var correctAnswersEl = document.getElementById('correctAnswers')
var scoreScreenEl = document.querySelector('.score-screen')
var scoreEl = document.getElementById('score')


//set object array to localStorage for testing
var highscores = []
localStorage.getItem('highscores', JSON.stringify(highscores));



var highscoreScreenEl = document.querySelector('.highscore-screen')
var initials = document.querySelector('#userName')



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
        question: "Whats up",
        answers:["Nothing Much","Doing Well", "Studying","Chillin"],
        correct: 3
    },
    {
        question: "Whats up2",
        answers:["Nothing Much2","Doing Well2", "Studying2","Chillin2"],
        correct: 3
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

//Global variables


let questionIndex = 0;
let correctAnswers = 0;
let score = 0;

//set time limit for test in seconds
//display countdown timer
var totalTime = 15; 
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
//reruns askQuestion for next question or scorescreen
function checkAnswer(answerIndex){
    if(answerIndex === questions[questionIndex].correct){
        correctAnswers++
        questionIndex++  
    }else{
        questionIndex++;
        timeLeft--;
    }
    askQuestion();
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
    score = timeLeft * correctAnswers * 100
    scoreEl.textContent = `Score: ${score}`;
    if(timeLeft > 1){
        countdownEl.textContent = `${timeLeft} seconds remaining`
    }else if (timeLeft == 1){
        countdownEl.textContent = `${timeLeft} second remaining`
    }else{
        countdownEl.textContent = "No Time Left"
    }
}

//retireves high scores from localstorage
//iterates through highscore array displaying textContent for each list item  
//the id on list items is highscoreIndex0 through highscoreIndex11
//total of 12 list items
function loadHighScores(){
    var highscoreFromLocal = JSON.parse(localStorage.getItem('highscores'))
    for(i=0; i < highscoreFromLocal.length && i < 12; i++){
        document.querySelector(`#highscoreIndex${i}`).textContent = `${highscoreFromLocal[i].score} ${highscoreFromLocal[i].initials}` ;
    }
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
            countdownEl.textContent =  `0:${timeLeft}`;
        }else if(timeLeft >= 1){
            countdownEl.textContent = `0:0${timeLeft}`;
        }else{
            clearInterval(timeInterval);
            scoreScreen();
        }
        },1000);
}

//Event Listeners
//start button event
//starts timer
//hides button
//shows first question
startButtonEl.addEventListener("click", function() {
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
    timeLeft = totalTime
    countdown();
    askQuestion();
});

//hide scorescreen
//display recent highscores, current score with input for initials and save button
saveHighScoreButtonEl.addEventListener('click', function(){
    scoreScreenEl.setAttribute('style', 'display:none');
    highscoreScreenEl.setAttribute('style', 'display:flex');
    loadHighScores();
})

//Update highscore array with current score and initials
//newHighscore captures initails from #userName input
//adds current score to array
saveScoreWithInitialsButtonEl.addEventListener('click', function(event){
    event.preventDefault();
    var newHighscore = {
        initials: initials.value,
        score: score
    }
    highscores.push(newHighscore)
    console.log(highscores);
    localStorage.setItem('highscores', JSON.stringify(highscores));
    loadHighScores();
    
})
