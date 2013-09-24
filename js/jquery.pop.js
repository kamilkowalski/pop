(function($){

  // Pop definition
  var Pop = function(element, options){
    this.$element = $(element);
    this.$backdrop = null;
    this.options = options;
  }

  Pop.DEFAULTS = {
    animate: true
  }

  Pop.prototype.show = function(args){
    if(args.load){
      this.loadUrl(args.load, this.showPop);
    } else {
      this.showPop();
    }
  }

  Pop.prototype.showPop = function(){
    var that = this;

    if(!that.$backdrop && $(".pop-backdrop").length){
      that.$backdrop = $(".pop-backdrop");
    } else if(!that.$backdrop){
      that.$backdrop = $("<div>", {"class": "pop-backdrop"}).hide().appendTo(document.body);
    }

    if(!that.$element.parent().length){
      that.$element.appendTo(document.body);
    }

    that.$backdrop.show();
    that.$element.show();

    that.$element.one("click", "[data-close]", function(e){
      e.preventDefault();
      that.hide();
    });

    that.$element.on("click", function(e){
      if(e.target !== e.currentTarget) return;
      that.hide();
    });

    setTimeout($.proxy(function(){
      this.$backdrop.addClass("in").attr("aria-hidden", false);
      this.$element.addClass("in").attr("aria-hidden", false);
      if(this.$element.hasClass("pop-flex")){
        $(window).trigger("resize");
      }
    }, that), 0);

    $(document.body).addClass("pop-open");
  }

  Pop.prototype.loadUrl = function(url, callback){
    $.get(url, $.proxy(function(data, status, xhr){
      this.$element.find(".pop-output").html(data);
      $.proxy(callback, this)();
    }, this));
  }

  Pop.prototype.flex = function(){
    var dialog = this.$element.find(".pop-dialog");
    var margin = parseInt(dialog.css("margin-top")) || 0;
    dialog.height($(window).height()-2*margin);

    var head = dialog.find(".pop-head").height() || 0;
    var submenu = dialog.find(".pop-submenu").height() || 0;

    dialog.find(".pop-main").height(dialog.height()-head-submenu);
  }

  Pop.prototype.hide = function(){
    this.$backdrop.removeClass("in");
    this.$element.removeClass("in");

    setTimeout($.proxy(function(){
      this.$backdrop.hide().attr("aria-hidden", true);
      this.$element.hide().attr("aria-hidden", true);

      $(document.body).removeClass("pop-open");
    }, this), 100);

    this.$element.off("click");    
  }

  $.fn.pop = function(option, argv){
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('wo.pop');
      var options = $.extend({}, Pop.DEFAULTS, $this.data(), typeof option == 'object' && option);
      var arguments = $.extend({}, typeof argv == 'object' && argv);

      if (!data) $this.data('wo.pop', (data = new Pop(this, options)));
      if (typeof option == 'string') data[option](arguments);
      else if (options.show) data.show(arguments);
    });
  }

  $(window).on("resize", function(){
    $(".pop-flex").each(function(){
      var $this = $(this);
      var data = $this.data('wo.pop');
      var options = $.extend({}, Pop.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) $this.data('wo.pop', (data = new Pop(this, options)));
      data.flex();
    });
  });

  $(window).trigger("resize");

})(window.jQuery);
