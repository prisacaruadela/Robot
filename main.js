var response;
function askQuestion(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.status === 200 || this.status === 304){
            console.log(this.responseText);
            response = JSON.parse(this.responseText);
            document.getElementById("trivia-question").innerText = JSON.parse(this.responseText)['question'];
            document.getElementById("trivia-question").style.display="inline-block";
            document.getElementsByClassName("trivia-button")[0].style.display="inline-block";
            document.getElementsByClassName("trivia-button")[1].style.display="inline-block";
            document.getElementById("rsp-robot").style.display="none";
        }
    };
    const nr = Math.floor((Math.random() * 4) + 1);
    xhttp.open("GET","http://localhost:3000/trivia/"+nr);
    xhttp.send();

}
function yesResp() {
    document.getElementById("trivia-no").style.display = "none";
    var triviaAnswer = document.getElementById("trivia-yes");
    triviaAnswer.style.display = "inline-block";

    if(this.response['answer']==="yes")
        document.getElementById("rsp-robot").innerText="CORRECT";
    else
        document.getElementById("rsp-robot").innerText="INCORRECT";
    document.getElementById("rsp-robot").style.display="inline-block";

}
function noResp(){
    document.getElementById("trivia-yes").style.display="none";
    var triviaAnswer = document.getElementById("trivia-no");
    triviaAnswer.style.display="inline-block";
    if(this.response['answer']==="no")
        document.getElementById("rsp-robot").innerText="CORRECT";
    else
        document.getElementById("rsp-robot").innerText="INCORRECT";
    document.getElementById("rsp-robot").style.display="inline-block";
}