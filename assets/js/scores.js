//function to show the highscores list
var showHighScores = function(){
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    var highscoreiterator = 1;

    highscores.forEach(function(scores){       
        var highscoreiteratornumber = highscoreiterator + ".";
        var listscoreEl = document.createElement("li");
        listscoreEl.textContent = highscoreiteratornumber + "  " + scores.initials + " = " + scores.score;
        var olEl = document.getElementById("highscore");
        olEl.appendChild(listscoreEl);
        highscoreiterator++;
    });
};

//function to clear the highscores from the sessionstorage
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}


//onclick of the clear scores button
var clearScoreBtn = document.getElementById("clearscore");
clearScoreBtn.addEventListener("click",clearHighscores);

showHighScores();