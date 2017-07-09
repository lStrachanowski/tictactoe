$(document).ready(function() {

  var player, allNumbers, winCombinations;
  player ="";
  allNumbers = [1,2,3,4,5,6,7,8,9];
  winCombinations = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
  

  $("#playerX").click(function() {
    $("#boardContainer").fadeIn(1500).removeClass("boardContainerHide");
    player = "x";
    $("#displayMessage").hide().html("You are playing as: <div class='selectedPlayer'>"+ player+ "</div>").slideDown(500);

  });


  $("#playerO").click(function() {
    $("#boardContainer").fadeIn(1500).removeClass("boardContainerHide");
    player ="o";
    $("#displayMessage").hide().html("You are playing as: <div class='selectedPlayer'>"+ player+ "</div>").slideDown(500);
  });



});
