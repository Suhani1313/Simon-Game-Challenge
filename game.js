// Creating an empty  array named gamePattern and and an array buttonColors
var userClickedPattern=[];

var gamePattern=[];
var level=0;
var started=false;
var buttonColours=["red", "blue", "green", "yellow"];


//creating a function nextSequence in which random number is generated and by using random number..... random colour is generated and and that random color is added to the empty array gamePattern
function nextSequence(){

    var randomNumber=((Math.round((Math.random())*3)));

    var randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    var inputQuery="#"+randomChosenColour;

    $(inputQuery).fadeOut(20).fadeIn(20).fadeOut(20).fadeIn(20);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
     
}

$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    levelUP();
});




//Audio is played based on corresponding button which is clicked
$(".btn").click(function(){

// sound is played when a button is clicked

    var audioClicked=new Audio("sounds/"+this.id+".mp3");
    audioClicked.play();
});


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
    $("#"+currentColour).removeClass('pressed');
    }, 100);
}



console.log(level);

$("body").keypress(function(){
    nextSequence();
    $("#level-title").text("level "+level);
    console.log(level);
    started=true;
});

function levelUP()
{
    if(level==(userClickedPattern.length)-1)
        {
            for(var i=0,flag=0;i<=level;i++)
            {
                if(gamePattern[i]==userClickedPattern[i])
                    {
                        flag++;
                    }
                else{
                        console.log("OUT");
                        var wrongSound=new Audio("sounds/wrong.mp3");
                        wrongSound.play();
                        $("body").addClass("game-over");
                        setTimeout(function() {
                            $("body").removeClass("game-over");
                        }, 350);
                        $("h1").text("Game Over, Press Any Key to Restart 👎");
                        startOver();
                        userClickedPattern=[];
                    }

            }
          if((flag-1)==level){
            $("h1").text("level "+ ++level);
                setTimeout(nextSequence, 100);
                console.log(level);
            
                userClickedPattern=[];
                flag=0;
                i=0;
        }
}
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    
}