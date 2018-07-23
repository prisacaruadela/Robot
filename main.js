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
  }

  var ouchFunction = function() {

    var documentHeight = document.documentElement.clientHeight;
    var documentWidth = document.documentElement.clientWidth;

    if (document.getElementById("divRandom"))
        document.body.removeChild(document.getElementById("divRandom"));

    var newDiv = document.createElement("div"); 
    var newContent = document.createTextNode("OUCH"); 
    newDiv.setAttribute("id", "divRandom");
    newDiv.appendChild(newContent);                                
    document.body.appendChild(newDiv);                    

    }
    
  var robotItem = document.getElementsByClassName("robot-wrapper");
  
  for (var i = 0; i < robotItem.length; i++) {
    robotItem[i].onclick = ouchFunction;
  }
})();

var changeTextColor = function() {
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
  xhttp.onreadystatechange = function() {
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
