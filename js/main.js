$(document).ready(function() {

  var player,comp,allNumbers,winCombinations,playerArr,compArr;
  player =""; //storing sign choosen by player
  comp = "";  //storing sign od computer
  allNumbers = [0,1,2,3,4,5,6,7,8,9];
  winCombinations = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
  playerArr = [];

  // selecting x as player singn
  $("#playerX").click(function() {
    $("#boardContainer").fadeIn(1500).removeClass("boardContainerHide");
    $("#score").slideDown(500).removeClass("boardContainerHide");
    player = "x";
    comp = "o";
    $("#displayMessage").hide().html("You are playing as: <div class='selectedPlayer'>"+ player+ "</div>").slideDown(500);
  });

  // selecting o as player singn
  $("#playerO").click(function() {
    $("#boardContainer").fadeIn(1500).removeClass("boardContainerHide");
    $("#score").slideDown(500).removeClass("boardContainerHide");
    player ="o";
    comp = "x";
    $("#displayMessage").hide().html("You are playing as: <div class='selectedPlayer'>"+ player+ "</div>").slideDown(500);
  });


  $("div.containerColor").click(function(){
    // Is pushing clicked Id number to playerArr, which is storing id clicked by player.
    var currIdNum = (this.id).split("");
    var currNum = Number(currIdNum[currIdNum.length-1]);
    if(allNumbers.indexOf(currNum) != -1){
      playerArr.push(currNum);
      allNumbers[currNum] = 0;
    }else{
      // If player clicked Id , whihc was already clicked , sign is changing color to red for 0.7 sec.
      var errorColor = $("#"+this.id).addClass("errorSelected");
      setTimeout(function(){
        errorColor.removeClass("errorSelected");
      },700);
    }

    // Is displaying x or o on the board.
    if(player === "x"){
      $("#"+this.id).html("x");
    }else{
      $("#"+this.id).html("o");
    }

  });

});
