(function($){

  // Pop definition
  var Pop = function(element, options){
    this.$element = $(element);
    this.$backdrop = null;
    this._options = options;
  }

  Pop.DEFAULTS = {
    show: true
  }

  Pop.prototype.show = function(){

    // Set the Pop title if present
    if(this._options.title){
      this.title(this._options.title);
    }

    if(this._options.load){
      // First fetch the content, then run the callback
      this.loadUrl(this._options.load, this.showPop);
    } else {
      // Set the HTML if there's an option for it
      if(this._options.html){
        this.html(this._options.html);
      }

      this.showPop();
    }
  }

  Pop.prototype.html = function(html){
    this.$element.find(".pop-output").html(html);
  }

  Pop.prototype.options = function(options){
    this._options = options;
    return this;
  }

  Pop.prototype.title = function(title){
    this.$element.find(".pop-title").html(title);
  }

  Pop.prototype.showPop = function(){
    var that = this;

    if(!that.$backdrop && $(".pop-backdrop").length){
      that.$backdrop = $(".pop-backdrop");
    } else if(!that.$backdrop){
      that.$backdrop = $("<div>", {"class": "pop-backdrop"}).hide().appendTo(document.body);
    }

    that.$element.appendTo(document.body);

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

    that.$element.on("click", "[data-tabs] a", function(e){
      e.preventDefault();
      $(this).parent().siblings().removeClass("active").end().addClass("active");
      $($(this).attr("href")).siblings().removeClass("active").end().addClass("active");
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
      this.html(data);
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

  $.fn.pop = function(option){
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('wo.pop');
      var options = $.extend({}, Pop.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) $this.data('wo.pop', (data = new Pop(this, options)));
      if (typeof option == 'string') data[option]();
      else if (options.show) data.options(options).show();
    });
  }

  $(window).on("resize", function(){
    $(".pop-flex").each(function(){
      var $this = $(this);
      var data = $this.data('wo.pop');
      if (data) data.flex();
    });
  });

  $(document).on("click", ".pop a[data-remote]", function(e){
    e.preventDefault();
    $.ajax($(this).attr("href"));
  });

  $(document).on("submit", ".pop form[data-remote]", function(e){
    e.preventDefault();
    var form = $(this);
    
    $.ajax(form.attr("action"), {
      data: form.serialize(),
      type: (form.attr("method") || "POST"),
      success: function(data, status, jqxhr){
        form.trigger("pop:success", [data, status, jqxhr]);
      },
      complete: function(jqxhr, status){
        form.trigger("pop:complete", [jqxhr, status]);
      },
      error: function(jqxhr, status, error){
        form.trigger("pop:error", [jqxhr, status, error]);
      }
    });
  });

})(window.jQuery);
