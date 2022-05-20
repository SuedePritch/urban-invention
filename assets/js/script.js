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

function loadQuestion(questionNumber){
    questionEl.textContent = `${questions[questionNumber].question}`
    answer1El.textContent = `${questions[questionNumber].answers[0]}`
    answer2El.textContent = `${questions[questionNumber].answers[1]}`
    answer3El.textContent = `${questions[questionNumber].answers[2]}`
    answer4El.textContent = `${questions[questionNumber].answers[3]}`
}

// loadQuestion(0);
loadQuestion(1);
// loadQuestion(2);
// loadQuestion(3);

