
var wins = 0;
var loses = 0;
var totalScore = 0;


document.onkeyup = function() {

    // random number 
$("#random-button").on("click", function() {
    var random = Math.floor(Math.random() * 1000) + 1;
    $("#random-number").text(random);
});



};