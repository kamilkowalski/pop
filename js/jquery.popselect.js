(function($){
  $.fn.popselect = function(){
    return this.each(function(){
      var updatePopselect = function(s, di, dd){
        var opt = s.find("option:selected") || s.find("option:first-child");
        di.text(opt.text());
        dd.find("li").each(function(){
          if($(this).data("value") == opt.val()){
            $(this).siblings().removeClass("active")
              .end().addClass("active");
          }
        });
          
      }

      var that = $(this);

      // Set up the elements
      var ps = $("<div>", {"class": "popselect"});
      var display = $("<div>", {"class": "popselect-display"});
      var handle = $("<a>", {href: "#", "class": "popselect-handle"}).append($("<i>"));
      var dropdown = $("<ul>", {"class": "popselect-dropdown"});

      // Append the new select
      ps.append(display, handle, dropdown);
      that.after(ps);

      // Hide the original select
      that.hide();

      // Get the options from the select box and create list elements
      that.find("option").each(function(){
        var li = $("<li>", {data: {value: $(this).val()}});
        dropdown.append(li);
        
        li.text($(this).text());
        li.data("value", $(this).val());
      });

      // Set up events
      handle.add(display).on("click", function(e){
        e.preventDefault();
        dropdown.slideToggle(50);
        ps.toggleClass("active");
      });

      dropdown.on("click", "li", function(){
        that.val($(this).data("value"));
        that.trigger("change");
        display.text($(this).text());
        $(this).siblings().removeClass("active").end().addClass("active");
        dropdown.slideUp(50);
        ps.removeClass("active");
      });

      $(document).on("click", function(e){
        if(!ps.is(e.target) && ps.has(e.target).length == 0){
          dropdown.slideUp(50);
          ps.removeClass("active");
        }
      });

      that.on("change", function(){
        updatePopselect(that, display, dropdown);
      });

      // Run the update procedure to get the current selection
      updatePopselect(that, display, dropdown);
    });
  }
})(jQuery);
