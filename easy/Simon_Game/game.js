var gamePattern=[];
var level=0;
var started = false;
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var mode=false;

function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
    
    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})


$(".mode").click(function(){
    if(mode===false)
   { 
    $("body").css({"background-color": "#F0F8FF"});
    $("h1").css({"color" :"black"});
    $("img").attr("src", "moon-and-stars-svgrepo-com.svg");
    mode=true;
}
    else{
        $("body").css({"background-color": "#011F3F"});
        $("h1").css({"color" :"#FEF2BF"});  
        $("img").attr("src", "icons8-sun-50.png");
        mode=false;
    }
    

})

function playsound(name){
    var audio = new Audio('sounds/'+name +'.mp3');
    audio.play();
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}
$(document).keypress(function(){
    if(!started){
    nextSequence();
    $("#level-title").text("Level " + level);
     $("#score").text(" ");
    started=true;
    }
});

function  checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
       console.log("success!!");
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
        
    }  
   }
   else {
       console.log("wrong!!");
  playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over,Press Any Key to Restart");
    $("#score").text("Your Score "+level);
    
    startOver();
    }
}

function startOver(){
    level=0;
   
     gamePattern=[];
     started=false;
}
