$(document).ready(function() {


  $("#boardContainer").addClass("boardContainerHide");

  $("#playerX").click(function() {
    $("#boardContainer").fadeIn("400", function() {
      $("#boardContainer").addClass("boardContainerShow");
    });
  });


  $("#playerO").click(function() {
    $("#boardContainer").fadeIn("400", function() {
      $("#boardContainer").addClass("boardContainerShow");
    });
  });


});
