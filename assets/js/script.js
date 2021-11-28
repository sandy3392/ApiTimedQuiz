//variables to execute logic
var questionIterator = 0;
var timer = questions.length * 1000; //timeleft
var timing;
var score = 0;
// variables to refer dom elements
var startBtn = document.getElementById("start");
var challangepage = document.getElementById("challangepageId");
var questionsEl = document.getElementById("questions");
var questionsTitle = document.getElementById("question-title");
var questionsOptions = document.getElementById("options");
var timerId = document.getElementById("time");
var finalscore = document.getElementById("final-score");
var resultScreen = document.getElementById("result-screen");
var responceEl = document.getElementById("responce");
var initialsEl = document.getElementById("initials");
var submitBtn = document.getElementById("submit");

// sound effects
var soundRight = new Audio("assets/sounds/correct.wav");
var soundWrong = new Audio("assets/sounds/incorrect.wav");

var startChallange = function(){
    //toggle the challange layout and questions layout
    challangepage.setAttribute("class", "hide");
    questionsEl.removeAttribute("class", "hide");
    
    //update timer element
    timerId.textContent = timer;
    //start timer
    timing = setInterval(coundownTimer,1000);
    
    getQuestions();
};
var coundownTimer = function(){
    timer--;
    timerId.textContent = timer;
    if(timer <= 0){
        endQuiz();
    }
};


var getQuestions = function(){
    questionsTitle.innerHTML = questions[questionIterator].title;
    var questionArroptions = questions[questionIterator].options.length;

    var optionIterator = 0;
    questionsOptions.innerHTML = " ";
    while(optionIterator < questionArroptions){
        
        var listItemEl = document.createElement("button");
        listItemEl.className = "options";
        var optionNumber = optionIterator + 1 + ".";
        var optionsValue = questions[questionIterator].options[optionIterator];
        listItemEl.setAttribute("value", optionNumber + optionsValue);
        listItemEl.innerHTML = optionNumber + optionsValue;
        questionsOptions.appendChild(listItemEl);
        optionIterator++;
        listItemEl.onclick= checkAnswer;
    }
};

var endQuiz = function() {
    questionsEl.setAttribute("class", "hide");
    resultScreen.removeAttribute("class", "hide");
    clearInterval(timing);
    finalscore.textContent = timer;

};
var responceUpdate = function(res){

    responceEl.textContent =  res;

};

function checkAnswer(){

    if(this.value !== questions[questionIterator].answer) {
        timer = timer-15;
        timerId.textContent = timer;
        soundWrong.play();
        responceUpdate("Wrong!");
        responceEl.removeAttribute("class","hide");

    } else {
        soundRight.play();
        responceUpdate("Correct!");
        responceEl.removeAttribute("class","hide");
    }

    questionIterator++

    if(questionIterator === questions.length) {
        endQuiz();
    } else {
        getQuestions();  
    }
};

var saveHighScore = function(){
    var playerInitials = initials.value;
    if (playerInitials !== ""){
        //check if there is already a highscore or retrun empty array so that new score can be stored
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        var newscore = {
            score: timer,
            initials: playerInitials
        };
        //save new score to local storage
        highscores.push(newscore);
        window.localStorage.setItem("highscores",JSON.stringify(highscores));
        //go to new highscores page
        window.location.href ="highscores.html";

    }

};
function checkForEnterKey(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
        saveHighScore();
    }
};

//event for saving the high score
submitBtn.addEventListener("click",saveHighScore);

//initialsEl.addEventListener("keypress",checkForEnterKey);

//event for starting the Quiz
startBtn.addEventListener("click", startChallange);