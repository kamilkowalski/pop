$("#showPop1").on("click", function(){
  $("#myPop1").pop({html: "<div class=\"pop-main\"><div class=\"pop-body\">This is the real body!</div></div>", title: "Real title"});
});

$("#showPop2").on("click", function(e){
  $("#myPop2").pop();
});

$(document.body).on("click", ".pop a.btn-pop-more", function(e){
  e.preventDefault();
  $(this).closest("tr").next().toggleClass("active");
  $(this).parents("tr").toggleClass("openedbox");
  $(this).toggleClass("active");
});

$(document.body).on("click", ".pop .dTreeNode", function(){
  var node = $(this);
  var checkbox = node.find("input[type=checkbox]");
  console.log(checkbox.prop("checked"));
  if(checkbox.prop("checked")){
    checkbox.prop("checked", false);
    node.removeClass("chosen");
  } else {
    checkbox.prop("checked", true);
    node.addClass("chosen");
  }
});
