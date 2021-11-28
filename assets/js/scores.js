var showHighScores = function(){
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    var highscoreiterator = 1;
    console.log(highscores);

    highscores.forEach(function(scores){
        
        var highscoreiteratornumber = highscoreiterator + ".";
        var listscoreEl = document.createElement("li");
        listscoreEl.textContent = highscoreiteratornumber + "  " + scores.initials + " = " + scores.score;
        var olEl = document.getElementById("highscore");
        olEl.appendChild(listscoreEl);
        highscoreiteratornumber++;
    });
        //listscoreEl.textContent = (highscores[0].initials, highscores[0].score);
    // listscoreEl.setAttribute("value",highscores[0].initials);
    // listscoreEl.innerHTML= highscores[0].initials;

    

    
};

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}


//onclick of the clear scores button
var clearScoreBtn = document.getElementById("clearscore");
clearScoreBtn.addEventListener("click",clearHighscores);

showHighScores();