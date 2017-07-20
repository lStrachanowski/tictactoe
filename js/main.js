$(document).ready(function() {

  var player, comp, allNumbers, winCombinations, playerArr, compArr, turn, playerWinComb, compWinComb, blockNum;
  blockNum = 0
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
  compArr = [];
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
      allNumbers[currNum] = 0;

      // Is displaying x or o on the board.
      if (player === "x") {
        if (turn === "x") {
          playerArr.push(currNum);
          compWinComb = searchMatchNumber(compWinComb, currNum);
          $("#" + this.id).html("x");
          turn = "o";

          //When user will select center of board then use one from 4 comb numbers.
          if(currNum === 5 && playerArr.length == 1){
            var comb = [1,3,7,9];
            var randNum =  comb[Math.floor(Math.random()*comb.length)];
            compArr.push(randNum);
            playerWinComb = searchMatchNumber(playerWinComb, randNum);
              allNumbers[randNum] = 0;
            $("#squareNr" + randNum).html("o");
            turn = "x";
          }
          else if(playerArr.length == 2){
            var fBlock = findBlockingNumber(playerWinComb,playerArr);
            compArr.push(fBlock);
            allNumbers[fBlock] = 0;
              $("#squareNr" + fBlock).html("o");
              turn = "x";
          }
            else if (playerArr.length > 2) {
            var fBlock = findBlockingNumber(playerWinComb,playerArr);
            compArr.push(fBlock);
            allNumbers[fBlock] = 0;
            playerWinComb = searchMatchNumber(playerWinComb,fBlock);
            $("#squareNr" + fBlock).html("o");
            turn = "x";
          }
        }
      }
      console.log(allNumbers);
      // if (player === "o") {
      //   if (turn === "o") {
      //     $("#" + this.id).html("o");
      //     turn = "x";
      //   } else {
      //     $("#" + this.id).html("x");
      //     turn = "o";
      //   }
      // }

    } else {
      // If player clicked Id , which was already clicked , sign is changing color to red for 0.7 sec.
      var errorColor = $("#" + this.id).addClass("errorSelected");
      setTimeout(function() {
        errorColor.removeClass("errorSelected");
      }, 700);
    }

  });

});


// function is lookig for last missing number to get win combination
// arr - remaining win combinations array , pArr - array of numbers used by player.

function findBlockingNumber(arr, pArr) {
  var combArr = arr;
  var playerArrComb = pArr;
  var t = 0;
  for (var i = 0; i < combArr.length; i++) {
    t = combArr[i].filter(function(e) {
      return this.indexOf(e) < 0;
    }, playerArrComb);
    if (t.length === 1) {
      console.log(t);
      return t;
    }
  }
}


//function is returnig all two digit combinations from given array
function findPairs(arr) {
  var result = [];
  var combArr = arr;
  for (var i = 0; i < combArr.length; i++) {
    var r = combArr[i];
    for (var j = i + 1; j < combArr.length; j++) {
      var a = combArr[j];
      var res = [r, a];
      result.push(res);
    }
  }
  console.log(result);
  return result;
}


// Function is looking for number num in array arr. If match will be found then element with match will be deleted form array.
// Function removes from array combination of nubers with num.
function searchMatchNumber(arr, num) {
  var currArr = arr;
  var i = currArr.length - 1;
  while (i >= 0) {
    if (currArr[i].indexOf(num) != -1) {
      currArr.splice(i, 1);
    }
    i--;
  }
  return currArr;
}
