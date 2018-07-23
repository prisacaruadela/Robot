window.onload = function () {
    var myScore = localStorage.getItem("myScore");
    var robotScore = localStorage.getItem("robotScore");
    if (myScore == "undefined")
        localStorage.setItem("myScore", 0);
    if (robotScore == "undefined")
        localStorage.setItem("robotScore", 0);
}

var dataForRockGame = [];

function displayRock() {
    var rockButton = document.getElementsByClassName("rock-button");
    var i;
    for (i = 0; i < rockButton.length; i++) {
        rockButton[i].style.display = "inline";
    }
    getRockGameData();
};

function getRockGameData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            dataForRockGame = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", " http://localhost:3000/rockScissorsPaper", true);
    xhttp.send();
}

function playRock(myAnswer) {
    var number = Math.floor(Math.random() * 3);
    var robotAnswer = dataForRockGame[number].name;
    var robotSaysDiv = document.getElementById("robotSays").style.display = "block";
    var result = getResult(myAnswer, robotAnswer);
    robotSays.innerText = "Robot says: " + robotAnswer + ". " + result;
};

function getResult(myAnswer, robotAnswer) {
    var myScore = Number(localStorage.getItem("myScore"));
    var robotScore = Number(localStorage.getItem("robotScore"));
    var newScore;
    var gameResult = document.getElementById("game-result");
    gameResult.style.display = "block";
    if (myAnswer == robotAnswer) {
        gameResult.innerText = "myScore: " + myScore + " robotScore: " + robotScore;
        return "Draw!";
    }
    if ((myAnswer == "rock" && robotAnswer == "scissor") ||
        (myAnswer == "scissor" && robotAnswer == "paper") ||
        (myAnswer == "paper" && robotAnswer == "rock")) {
        newScore = myScore + 1;
        localStorage.setItem("myScore", newScore);
        gameResult.innerText = "myScore: " + myScore + " robotScore: " + robotScore;
        return "You won!";
    }
    newScore = robotScore + 1;
    localStorage.setItem("robotScore", newScore);
    gameResult.innerText = "myScore: " + myScore + " robotScore: " + robotScore;
    return "You lost! Robot is better than you!";
}
