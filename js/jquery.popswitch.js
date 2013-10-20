(function($){
  $.fn.popswitch = function(){
    return this.each(function(){
      var that = $(this);

      if(!that.data("wo.popswitch")){

        var options = $.extend({on: "On", off: "Off"}, that.data());

        // Set up the elements
        var ps = $("<div>", {"class": "popswitch"});
        var slider = $("<div>", {"class": "popswitch-slider"});
        var handle = $("<div>", {"class": "popswitch-handle"}).append($("<i>"));
        var textTrue = $("<span>", {"class": "popswitch-text"}).text(options.on);
        var textFalse = $("<span>", {"class": "popswitch-text"}).text(options.off);

        // Append the new switch
        slider.append(textFalse, handle, textTrue);
        ps.append(slider);
        that.after(ps);

        // Hide the original checkbox
        that.hide();

        // Get the original value
        if(that.prop("checked")) ps.addClass("on");

        // Set up events
        ps.on("click", function(e){
          e.preventDefault();
          
          if(ps.hasClass("on")){
            ps.removeClass("on");
            that.prop("checked", false);
          } else {
            ps.addClass("on");
            that.prop("checked", true);
          }

          that.trigger("change");
        });

        that.on("change", function(){
          if(that.prop("checked")){
            ps.addClass("on");
          } else {
            ps.removeClass("on");
          }
        });

        // Save the popswitch creation in data, so that it's not created again
        that.data("wo.popswitch", true);
      }
    });
  }

  $("[data-popswitch]").popswitch();
})(jQuery);
