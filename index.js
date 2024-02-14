var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false

$("ul").slideToggle();

$(".question").click(function(e) {
    $("ul").slideToggle();


});

//game sequance
function nextSquenece(buttonColors) {

    started = true
    var randomNumber = Math.floor(Math.random() * 4)
    var chosenColor = buttonColors[randomNumber]

    gamePattern.push(chosenColor)

    $("." + chosenColor).fadeOut(100).fadeIn(100)
    new Audio("./sounds/" + chosenColor + ".mp3").play()
    level++
    $("h1").text("level " + level);


}

//press any key to start
$("body").keypress(function(event) {
    if (started === false)
        nextSquenece(buttonColors)

});

//click on screen for mobile phones
$("body").click(function(event) {
    if (started === false)
        nextSquenece(buttonColors)

});

//play after game over
function startOver() {
    $("body").keypress(function(event) {
        if (started === false)
            nextSquenece(buttonColors)
    });

    gamePattern = []
    userClickedPattern = []
    level = 0
    started = false
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            // console.log("succecss")
            setTimeout(function() {
                nextSquenece(buttonColors)
            }, 1000)
            userClickedPattern = []
        }
    } else {
        // console.log("wrong")
        new Audio("./sounds/wrong.mp3").play()
        $("body").addClass("gameover");
        setTimeout(function() {
            $("body").removeClass("gameover");
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver()

    }
}



$(".btn").click(function() {
    var userChosenColor = $(this).attr("id")
    new Audio("./sounds/" + userChosenColor + ".mp3").play()

    $("." + userChosenColor).addClass("pressed")
    setTimeout(function() {
        $("." + userChosenColor).removeClass("pressed")

    }, 100)

    userClickedPattern.push(userChosenColor)


    checkAnswer(userClickedPattern.length - 1)

    console.log(userClickedPattern)
    console.log(gamePattern)
})
