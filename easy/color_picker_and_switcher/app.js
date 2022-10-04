//function to change color
function changeColor(){
    document.body.style.backgroundColor = document.getElementById("code").value;
}

//function to randomize the background color
function randomColor(){
    var randColor = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = "#" + randColor;
    document.getElementById("code").value = "#" + randColor;
}

//function to remove last character of color
function backSpace(){
    
    var color = document.getElementById('code').value;
    document.getElementById('code').value=color.substring(0,color.length -1);
  
}

//function to clear background
function blankClear(){
    document.body.style.backgroundColor = "white";
    document.getElementById("code").value = ""
}