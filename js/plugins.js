// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

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
