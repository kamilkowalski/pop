$("#showPop1").on("click", function(){
  $("#myPop1").pop("show");
});

$("#showPop2").on("click", function(){
  $("#myPop2").pop("show", {load: "ajax_contents.html"});
});
