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

      // Is displaying x or o on the board.
      if (player === "x") {
        if (turn === "x") {
          playerArr.push(currNum);
          allNumbers[currNum] = 0;
          compWinComb = searchMatchNumber(compWinComb, currNum);
          $("#" + this.id).html("x");
          turn = "o";
          findBlockingNumber(playerWinComb, playerArr, 1);
          //When user will select center of board then use one from 4 comb numbers.
          if (currNum === 5 && playerArr.length == 1) {
            var comb = [1, 3, 7, 9];
            var randNum = comb[Math.floor(Math.random() * comb.length)];
            compArr.push(randNum);
            var searchVal = searchMatchNumber(playerWinComb, Number(randNum));
            playerWinComb = searchVal;
            allNumbers[randNum] = 0;
            $("#squareNr" + randNum).html("o");
            turn = "x";
          }
          if (currNum != 5 && playerArr.length == 1) {
            // Level hard
            // var searchVal = searchMatchNumber(playerWinComb, Number(5));
            // compArr.push(5);
            // allNumbers[5] = 0;
            // $("#squareNr" + 5).html("o");
            // turn = "x";

            // Easy level
            var tempArr = allNumbers.filter(function(e) {
              if (e != 0) {
                return e
              }
            });
            var randNum = tempArr[Math.floor((Math.random() * tempArr.length))];
            compArr.push(randNum);
            var searchVal = searchMatchNumber(playerWinComb, Number(randNum));
            allNumbers[randNum] = 0;
            playerWinComb = searchVal;
            $("#squareNr" + randNum).html("o");
            turn = "x";
          }
          if (playerArr.length >= 2) {
            var fBlock = findBlockingNumber(playerWinComb, playerArr, 0);
            if (fBlock != undefined) {
              compArr.push(fBlock);
              allNumbers[fBlock] = 0;
              var searchVal = searchMatchNumber(playerWinComb, Number(fBlock));
              playerWinComb = searchVal;
            } else {
              var tempArr = allNumbers.filter(function(e) {
                if (e != 0) {
                  return e
                }
              });
              var randNum = Math.floor(Math.random() * tempArr.length);
              fNum = tempArr[randNum];
              compArr.push(fNum);
              var searchVal = searchMatchNumber(playerWinComb, Number(fNum));
              allNumbers[fNum] = 0;
              playerWinComb = searchVal;
              fBlock = fNum;
            }

            $("#squareNr" + fBlock).html("o");
            turn = "x";
          }

        }
      }
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


//Function is drawing line when player or comp won the game
function drawLine(arr){

  this.temp = arr;
  var a1 = document.getElementById("squareNr" + temp[0]);
  var b1 = a1.getBoundingClientRect();
  var linkLine = $('<div id="new-link-line"></div>').appendTo('body');
  var cLength = Math.sqrt(Math.pow((b1.bottom-b1.top),2)+Math.pow((b1.right-b1.left),2));
  var angle = (180/ Math.PI) * Math.acos((b1.bottom-b1.top)/cLength);
  if (temp[0] == 1 && temp[2] == 7 || temp[0] == 2 && temp[2] == 8 || temp[0] == 3 && temp[2] == 9) {
    linkLine
    .css('top', b1.top)
    .css('left', b1.left + ((b1.right-b1.left)/2)-10);
    $('#new-link-line')
    .css('height', (b1.bottom - b1.top) * 3);
  }
  if(temp[0] == 1 && temp[2] == 3 || temp[0] == 4 && temp[2] == 6 || temp[0] == 7 && temp[2] == 9){
    linkLine
    .css('top', (b1.top)-15+((b1.bottom-b1.top)/2))
    .css('left', b1.left);
    $('#new-link-line')
    .css('height', 15)
    .css('width',((b1.right-b1.left)*3));
  }
  if(temp[0] == 1 && temp[2] == 9){

    linkLine
    .css('top', b1.top)
    .css('left', b1.left);
    $('#new-link-line')
    .css('height', cLength * 3)
    .css('-webkit-transform', 'rotate(' + (-angle) + 'deg)')
    .css('-moz-transform', 'rotate(' + (-angle) + 'deg)')
    .css('-o-transform', 'rotate(' + (-angle) + 'deg)')
    .css('-ms-transform', 'rotate(' + (-angle) + 'deg)')
    .css('transform', 'rotate(' + (-angle) + 'deg)');
  }
  if(temp[0] == 3 && temp[2] == 7){
    linkLine
    .css('top', b1.top)
    .css('left', b1.right-15);
    $('#new-link-line')
    .css('height', cLength * 3)
    .css('-webkit-transform', 'rotate(' + angle + 'deg)')
    .css('-moz-transform', 'rotate(' + angle + 'deg)')
    .css('-o-transform', 'rotate(' + angle + 'deg)')
    .css('-ms-transform', 'rotate(' + angle + 'deg)')
    .css('transform', 'rotate(' + angle + 'deg)');
  }

}

// function is lookig for last missing number to get win combination
// arr - remaining win combinations array , pArr - array of numbers used by player.
// opt - if 0 selected than fuction is finding blocking number
// opt - if 1 selected than function is checking if user has winning combination
function findBlockingNumber(arr, pArr, opt) {
  var combArr = arr;
  var playerArrComb = pArr;
  var t = 0;
  for (var i = 0; i < combArr.length; i++) {
    t = combArr[i].filter(function(e) {
      return this.indexOf(e) < 0;
    }, playerArrComb);
    if (opt === 0) {
      if (t.length === 1) {
        return t;
      }
    }
    if (opt === 1) {
      if (t.length === 0 && combArr[i].length === 3) {
        console.log(combArr[i] + " player won!!!!");
        var temp = combArr[i].slice();
        for (var j = 0; j < temp.length; j++) {
          $("#squareNr" + temp[j]).removeClass("containerColor").addClass("containerColor selectedPlayer");
        }
        drawLine(temp);
      }
    }
  }
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
