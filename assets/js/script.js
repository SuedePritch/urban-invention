var questionEl = document.getElementById('question')
var answer1El = document.getElementById('answer1')
var answer2El = document.getElementById('answer2')
var answer3El = document.getElementById('answer3')
var answer4El = document.getElementById('answer4')

var questions = [
    {question1: "Whats up",answers:["Nothing Much","Doing Well", "Studying","Chillin"]},
    {question2: "Whats up2",answers:["Nothing Much2","Doing Well2", "Studying2","Chillin2"]},
    {question3: "Whats up3",answers:["Nothing Much3","Doing Well3", "Studying3","Chillin3"]},
    {question4: "Whats up4",answers:["Nothing Much4","Doing Well4", "Studying4","Chillin4"],
    }
]

function loadQuestion1(){
questionEl.textContent = `${questions[0].question1}`
answer1El.textContent = `${questions[0].answers[0]}`
answer2El.textContent = `${questions[0].answers[1]}`
answer3El.textContent = `${questions[0].answers[2]}`
answer4El.textContent = `${questions[0].answers[3]}`
}
function loadQuestion2(){
questionEl.textContent = `${questions[1].question2}`
answer1El.textContent = `${questions[1].answers[0]}`
answer2El.textContent = `${questions[1].answers[1]}`
answer3El.textContent = `${questions[1].answers[2]}`
answer4El.textContent = `${questions[1].answers[3]}`
}
function loadQuestion3(){
questionEl.textContent = `${questions[2].question3}`
answer1El.textContent = `${questions[2].answers[0]}`
answer2El.textContent = `${questions[2].answers[1]}`
answer3El.textContent = `${questions[2].answers[2]}`
answer4El.textContent = `${questions[2].answers[3]}`
}
function loadQuestion4(){
questionEl.textContent = `${questions[3].question4}`
answer1El.textContent = `${questions[3].answers[0]}`
answer2El.textContent = `${questions[3].answers[1]}`
answer3El.textContent = `${questions[3].answers[2]}`
answer4El.textContent = `${questions[3].answers[3]}`
}



loadQuestion1();
// loadQuestion2();
// loadQuestion3();
// loadQuestion4();
