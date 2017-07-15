$(document).ready(function() {

  var player, comp, allNumbers, winCombinations, playerArr, compArr, turn,playerWinComb,compWinComb;
  player = ""; //storing sign choosen by player
  comp = ""; //storing sign od computer
  turn = ""; //storing value , whos turn is it.
  allNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  playerArr = [];
  playerWinComb = winCombinations.slice("");
  compWinComb = winCombinations.slice("");

  // selecting x as player singn
  $("#playerX").click(function() {
    $("#boardContainer").fadeIn(1500).removeClass("boardContainerHide");
    $("#score").slideDown(500).removeClass("boardContainerHide");
    player = "x";
    comp = "o";
    turn = "x";
    $("#displayMessage").hide().html("You are playing as: <div class='selectedPlayer'>" + player + "</div>").slideDown(500);
  });

  // selecting o as player singn
  $("#playerO").click(function() {
    $("#boardContainer").fadeIn(1500).removeClass("boardContainerHide");
    $("#score").slideDown(500).removeClass("boardContainerHide");
    player = "o";
    comp = "x";
    turn = "o";
    $("#displayMessage").hide().html("You are playing as: <div class='selectedPlayer'>" + player + "</div>").slideDown(500);
  });


  $("div.containerColor").click(function() {
    // Is pushing clicked Id number to playerArr, which is storing ids clicked by player.
    var currIdNum = (this.id).split("");
    var currNum = Number(currIdNum[currIdNum.length - 1]);
    if (allNumbers.indexOf(currNum) != -1) {
      playerArr.push(currNum);
      allNumbers[currNum] = 0;
      // Is displaying x or o on the board.
      if (player === "x") {
        if(turn === "x"){
          searchMatchCombination(compWinComb,currNum);
          console.log(compWinComb);
          $("#" + this.id).html("x");
          turn = "o";
        } else {
          $("#" + this.id).html("o");
          turn = "x";
        }
      }
      if (player === "o") {
        if(turn === "o"){
          searchMatchCombination(compWinComb,currNum);
          console.log(compWinComb);
          $("#" + this.id).html("o");
          turn = "x";
        }else {
          $("#" + this.id).html("x");
          turn = "o";
        }
      }

    } else {
      // If player clicked Id , which was already clicked , sign is changing color to red for 0.7 sec.
      var errorColor = $("#" + this.id).addClass("errorSelected");
      setTimeout(function() {
        errorColor.removeClass("errorSelected");
      }, 700);
    }

  });

});


// Function is looking for number num in array arr. If match will be found then element with match will be deleted form array.
function searchMatchCombination(arr,num){
  var currArr = arr;
  var i = currArr.length-1;
  while(i>=0){
    if(currArr[i].indexOf(num) != -1){
      currArr.splice(i,1);
    }
    i--;
  }
}
