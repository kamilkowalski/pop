$(function(){
  $(window).on("resize", function(){
    $(".pop-flex > .pop-dialog").each(function(){
      var $this = $(this);
      var margin = parseInt($this.css("margin-top")) || 0;
      $this.height($(window).height()-2*margin);

      var head = $this.find(".pop-head").height() || 0;
      var submenu = $this.find(".pop-submenu").height() || 0;

      $this.find(".pop-main").height($this.height()-head-submenu);
    });
  });

  $(window).trigger("resize");
});
