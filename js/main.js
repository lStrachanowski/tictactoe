var player, comp, allNumbers, winCombinations, playerArr, compArr, turn, playerWinComb, compWinComb, blockNum,
selectedLevel,currIdNum,currNum,scoreX,scoreY;
blockNum = 0
player = ""; //storing sign choosen by player
comp = ""; //storing sign od computer
turn = ""; //storing value , whos turn is it.
selectedLevel = "";
scoreX = 0;
scoreO = 0;
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

$(document).ready(function() {
  $("#score").html("x   " + scoreX + " : " + scoreO + "   o");
  //Easy level selected
  $("#easyLevel").click(function(){
    selectedLevel ="easy";
    $("#displayMessage").fadeIn(500).removeClass("boardContainerHide");
    $("#levelBox").hide();
  });

  //Hard level selected
  $("#hardLevel").click(function(){
    selectedLevel ="hard";
    $("#displayMessage").fadeIn(500).removeClass("boardContainerHide");
    $("#levelBox").hide();
  });

  // selecting x as player singn
  $("#playerX").click(function() {
    $("#boardContainer").fadeIn(1500).removeClass("boardContainerHide");
    $("#score").slideDown(500).removeClass("boardContainerHide");
    player = "x";
    comp = "o";
    turn = "x";
    $("#displayMessage").hide().html("Level: " +selectedLevel + ".   You are playing as: <div class='selectedPlayer'>" + player + "</div>").slideDown(500);
  });

  // selecting o as player singn
  $("#playerO").click(function() {
    $("#boardContainer").fadeIn(1500).removeClass("boardContainerHide");
    $("#score").slideDown(500).removeClass("boardContainerHide");
    player = "o";
    comp = "x";
    turn = "o";
    $("#displayMessage").hide().html("Level: " +selectedLevel + ".   You are playing as: <div class='selectedPlayer'>" + player + "</div>").slideDown(500);
  });

  $("div.containerColor").click(function() {
    // Is pushing clicked Id number to playerArr, which is storing ids clicked by player.
    currIdNum = (this.id).split("");
    currNum = Number(currIdNum[currIdNum.length - 1]);
    if (allNumbers.indexOf(currNum) != -1) {
      // Is displaying x or o on the board.
      if (player === "x") {
        if (turn === "x") {
          playerArr.push(currNum);
          allNumbers[currNum] = 0;
          compWinComb = searchMatchNumber(compWinComb, currNum);
          $("#" + this.id).html("x");

          findBlockingNumber(playerWinComb, playerArr, 1,turn);
          turn = "o";
          compResponse("x");
        }
      }
      if (player === "o") {
        if (turn === "o") {
          playerArr.push(currNum);
          allNumbers[currNum] = 0;
          compWinComb = searchMatchNumber(compWinComb, currNum);
          $("#" + this.id).html("o");

          findBlockingNumber(playerWinComb, playerArr, 1,turn);
          turn = "x";
          compResponse("o");
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

//Function is responding with move , base on player move.
// sPlayer - value is "x" or "o" , depending what was selected by player.
function compResponse(sPlayer){
  //When user will select center of board then use one from 4 comb numbers.
  this.selectedPlayer = sPlayer;
  if (currNum === 5 && playerArr.length == 1) {
    var comb = [1, 3, 7, 9];
    var randNum = comb[Math.floor(Math.random() * comb.length)];
    compArr.push(randNum);
    var searchVal = searchMatchNumber(playerWinComb, Number(randNum));
    playerWinComb = searchVal;
    allNumbers[randNum] = 0;
    if(this.selectedPlayer === "x"){
      $("#squareNr" + randNum).html("o");
      turn = "x";
    }else{
      $("#squareNr" + randNum).html("x");
      turn = "o";
    }
  }
  if (currNum != 5 && playerArr.length == 1) {

    // Level hard
    if(selectedLevel ==="hard"){
      var searchVal = searchMatchNumber(playerWinComb, Number(5));
      compArr.push(5);
      allNumbers[5] = 0;
      if(this.selectedPlayer === "x"){
        $("#squareNr" + 5).html("o");
        turn = "x";
      }else{
        $("#squareNr" + 5).html("x");
        turn = "o";
      }

    }

    // Easy level
    if(selectedLevel ==="easy"){
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
        if(this.selectedPlayer === "x"){
          $("#squareNr" + randNum).html("o");
          turn = "x";
        }else{
          $("#squareNr" + randNum).html("x");
          turn = "o";
        }
    }
  }
  if (playerArr.length >= 2) {
    var cBlock = findBlockingNumber(compWinComb, compArr, 0);
    var fBlock = findBlockingNumber(playerWinComb, playerArr, 0);
    if(cBlock != undefined){
      compArr.push(cBlock);
      allNumbers[cBlock] = 0;
      fBlock = cBlock;
      var searchVal = searchMatchNumber(playerWinComb, Number(cBlock));
      playerWinComb = searchVal;
      findBlockingNumber(compWinComb, compArr,1);
    }else{
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
    }

    if(this.selectedPlayer === "x"){
      $("#squareNr" + fBlock).html("o");
      turn = "x";
    }else{
      $("#squareNr" + fBlock).html("x");
      turn = "o";
    }
  }
}

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
function findBlockingNumber(arr, pArr, opt,turn) {
  this.combArr = arr;
  this.playerArrComb = pArr;
  this.turn = turn;
  var t = 0;
  for (var i = 0; i < this.combArr.length; i++) {
    t = this.combArr[i].filter(function(e) {
      return this.indexOf(e) < 0;
    }, this.playerArrComb);
    if (opt === 0) {
      if (t.length === 1) {
        return t[0];
      }
    }
    if (opt === 1) {
      if (t.length === 0 && this.combArr[i].length === 3) {
        var temp = this.combArr[i].slice();
        for (var j = 0; j < temp.length; j++) {
          $("#squareNr" + temp[j]).removeClass("containerColor").addClass("containerColor selectedPlayer");
        }
        drawLine(temp);
        allNumbers.fill(0);
        if(this.turn === "x"){
          scoreX++;
        }else if( this.turn === "o"){
          scoreO++;
        }else if(this.turn == undefined){
          if(player === "x"){
            scoreO++;
          }else{
            scoreX++;
          }
        }
        $("#score").html("x   " + scoreX + " : " + scoreO + "   o");
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
