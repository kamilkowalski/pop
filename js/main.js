$("#showPop1").on("click", function(){
  $("#myPop1").pop("show");
});

$("#showPop3").on("click", function(){
  $("#myPop3").pop("show", {load: "ajax_calendar.html"});
});

$("#showPop2").on("click", function(){
  $("#myPop2").pop("show", {load: "ajax_contents.html"});
});
