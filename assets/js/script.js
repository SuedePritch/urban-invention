
var questionContainerEl = document.querySelector('.question-container')
var startButtonEl = document.getElementById('startButton')
var questionEl = document.getElementById('question')
var answer1El = document.getElementById('answer1')
var answer2El = document.getElementById('answer2')
var answer3El = document.getElementById('answer3')
var answer4El = document.getElementById('answer4')


var questions = [
    {question: "Whats up",answers:["Nothing Much","Doing Well", "Studying","Chillin"]},
    {question: "Whats up2",answers:["Nothing Much2","Doing Well2", "Studying2","Chillin2"]},
    {question: "Whats up3",answers:["Nothing Much3","Doing Well3", "Studying3","Chillin3"]},
    {question: "Whats up4",answers:["Nothing Much4","Doing Well4", "Studying4","Chillin4"]}
]
let questionIndex = 0;

function loadQuestion(questionIndex){
    questionEl.textContent = `${questions[questionIndex].question}`
    answer1El.textContent = `${questions[questionIndex].answers[0]}`
    answer2El.textContent = `${questions[questionIndex].answers[1]}`
    answer3El.textContent = `${questions[questionIndex].answers[2]}`
    answer4El.textContent = `${questions[questionIndex].answers[3]}`
}
function runQuiz(){
    //Set start button text
    startButtonEl.textContent = 'Start Quiz'
    //start button event
    startButtonEl.addEventListener("click", function() {
        //hides button
        startButtonEl.setAttribute('style', "display:none");
        // loads first question
        loadQuestion(questionIndex)
        //increases questionIndex
        questionIndex++
        //displays question
        questionContainerEl.setAttribute('style', "display:block");
        
        
        
    });
    
    questionContainerEl.addEventListener("click", function(event) {
        var element = event.target;
        if(element.matches('li')){
            console.log(element.textContent);
        }
    })
}
runQuiz();