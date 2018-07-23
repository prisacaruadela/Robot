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


var promiseForDiv = new Promise(function(resolve, reject) {
  var ok = 0;
  for (var j = 0; j <= 10000; j++) {
    ok = 1;
  }
  if (ok == 1) {
    var obj = "Succes";
    resolve(obj);
  } else {
    var reason = new Error("Your request is rejected");
    reject(reason);
  }
});

(function assignButtonFunction() {
  var button = document.getElementById("writeButton");
  button.onclick = function() {
    button.disabled = true;
    var x = localStorage.getItem("colorKey");
    if (x) {
      var elw = document.getElementById("writeArea");
      elw.style.color = x;
    }

    showElementsButtons();
    loadData();
  };
  var ouchFunction = function() {

    if (document.getElementById("divRandom")) {
      document.body.removeChild(document.getElementById("divRandom"));
    }

    promiseForDiv
    .then(function (fulfilled) {
        console.log(fulfilled);
    })
    .catch(function (error) {
        console.log(error.message);
    });

    var newDiv = document.createElement("div");
    var newContent = document.createTextNode("OUCH");
    newDiv.setAttribute("id", "divRandom");
    newDiv.appendChild(newContent);
    document.body.appendChild(newDiv);
  };

  var robotItem = document.getElementsByClassName("robot-wrapper");

  for (var i = 0; i < robotItem.length; i++) {
    robotItem[i].onclick = ouchFunction;
  }
})();

var changeTextColor = function () {
  var backColor = this.style.backgroundColor;

  localStorage.removeItem("colorKey");
  localStorage.setItem("colorKey", backColor);

  var elw = document.getElementById("writeArea");
  elw.style.color = backColor;
};

function showElementsButtons() {
  var buttons = document.getElementsByClassName("color-button");
  for (var i = 0; i < buttons.length; i++) {
    buttons.item(i).style.display = "block";
    buttons.item(i).addEventListener("click", changeTextColor, false);
  }

  var elw = document.getElementById("writeArea");
  elw.style.display = "inline";
}

function loadData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      console.log(this.responseText);
      var buttons = document.getElementsByClassName("color-button");
      var colourarray = [];
      for (var j = 0; j < response.length; j++) {
        colourarray.push(response[j]);
      }
      for (var i = 0; i < buttons.length; i++) {
        buttons.item(i).style.backgroundColor = colourarray[i];
        buttons.item(i).style.width = "50px";
        buttons.item(i).style.height = "50px";
      }
    }
  };
  xhttp.open("GET", " http://localhost:3000/colors", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send();
}
