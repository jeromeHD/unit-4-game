$(document).ready(function() {
  var yourGuess = 0;
  var randomNum = randomNumGen();
  var wins = 0;
  var losses = 0;
  var crystals;

  // Random Crystal Numbers
  function randomNumCrystals() {
    return {
      red: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/red.png"
      },
      blue: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/blue.png"
      },
      yellow: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/yellow.png"
      },
      green: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/green.png"
      }
    };
  }

  function randomNumGen() {
    return Math.floor(Math.random() * 102) + 19;
  }

  // Function that resets the game.
  function setGame() {
    // Set current total number 0.
    yourGuess = 0;
    // Random crystal values.
    crystals = randomNumCrystals();
    // Random number and set to the page.
    randomNum = randomNumGen();
    $("#random-area").text(randomNum);
  }

  // Updates the page
  function updateDom(didUserWin) {
    $("#win-loss").empty();

    if (didUserWin === true) {
      $("#win-area").append($("<p>").text("You won!!"));
      setGame();
      renderMatchingNumber();
    } else if (didUserWin === false) {
      $("#win-area").append($("<p>").text("You lost!!"));
      setGame();
      renderMatchingNumber();
    }

    // Win/Loss
    var wSpan = $("<span>").text(wins);
    var lSpan = $("<span>").text(losses);

    var pWins = $("<p>").text("Wins: ");
    var pLosses = $("<p>").text("Losses: ");

    pWins.append(wSpan);
    pLosses.append(lSpan);

    $("#win-area").append(pWins);
    $("#win-area").append(pLosses);
  }

  // Function to render our crystals to the page.
  function renderCrystals() {
    for (var key in crystals) {
      var crystalDiv = $(
        "<div class='crystals-button' data-name='" + key + "'>"
      );
      var crystalImg = $("<img alt='image' class='crystal-img'>").attr(
        "src",
        crystals[key].imageUrl
      );
      crystalDiv.append(crystalImg);
      $("#crystal-area").append(crystalDiv);
    }
  }

  // Function to update our "current guess" number. We are passing in the crystal that was clicked as an argument.
  function updateMatchingNumber(crystal) {
    // Update our "current guess" number based on which crystal was clicked.
    yourGuess += crystals[crystal.attr("data-name")].points;
  }

  // Function that will render your "current guess" number to the page.
  function renderMatchingNumber() {
    var scoreNumDiv = $("<div id='score-number'>").text(yourGuess);
    $("#score-number").html();
    $("#score-number").html(scoreNumDiv);
  }

  // Call our functions to start the game!
  setGame();
  updateDom();
  renderCrystals();
  renderMatchingNumber();

  $(".crystals-button").on("click", function(event) {
    updateMatchingNumber($(this));
    renderMatchingNumber();

    // Check to see if we have won or lost.
    if (yourGuess === randomNum) {
      wins++;
      setGame();
      updateDom(true);
    } else if (yourGuess > randomNum) {
      losses++;
      setGame();
      updateDom(false);
    }
  });
});
