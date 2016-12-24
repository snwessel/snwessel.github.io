/*
* jQuery appear plugin
*
* Copyright (c) 2012 Andrey Sidorov
* licensed under MIT license.
* Edit by HRM 2013 02 01
* https://github.com/morr/jquery.appear/
*
* Version: 0.2.1
*/
(function($) {
  var selectors = [];
  var $window = $(window);
  var $document = $(document);

  function process(p) {
    p.checkLock = false;
    var $appeared = p.elements.filter(function() {
        return $(this).is(p.filterName);
    });
    if($appeared.length==0){
      return;
    }
    p.callback($appeared);
  }

  // "appeared" custom filter
  $.expr[':']['appeared'] = function(element) {
    var $element = $(element);
    if (!$element.is(':visible')) {
      return false;
    }

    var window_left = $window.scrollLeft();
    var window_top = $window.scrollTop();
    var offset = $element.offset();
    var left = offset.left;
    var top = offset.top;
    if (top + $element.height() >= window_top &&
        top - ($element.data('appear-top-offset') || 0)
          <= window_top + $window.height() &&
        left + $element.width() >= window_left &&
        left - ($element.data('appear-left-offset') || 0)
          <= window_left + $window.width()) {
      return true;
    } else {
      return false;
    }
  }

   // "in-full-view" custom filter
  $.expr[':']['fully-appeared'] = function(element) {
    var $element = $(element);
    if (!$element.is(':visible')) {
      return false;
    }
    wLeft=$window.scrollLeft();
    wTop=$window.scrollTop();
    var offset = $element.offset();
    var left = offset.left- ($element.data
      ('appear-left-offset') || 0);
    var right = (offset.left+$element.width()) -
      ($element.data('appear-left-offset') || 0);
    var top = offset.top - ($element.data
      ('appear-top-offset') || 0);
    var bottom = offset.top+$element.height();
    var window_left = wLeft;
    var window_top = wTop;
    var window_right = wLeft+ $window.width();
    var window_bottom = wTop+$window.height();

    if (window_bottom>=bottom&&
        window_top<=top&&
        window_left<=left&&
        window_right>=right ) {
      return true;
    } else {
      return false;
    }
  }

  function compare(o1,o2){
    //simple compare, assumes all properties of o1 and o2 are
    //  simple types make sure that o1 is not undefined
    //  comparing goes much further but requires writing another
    //  extension
    if(typeof o2=="undefined"){
      return false;
    }
    var i;
    for(i in o1){
      if(typeof o2[i]=="undefined"){
        return false;
      }
    }
    for(i in o1){
      if(o1[i]!=o2[i]){
        return false;
      }
    }
    return true;
  }

  function checkExist(selector){
    return !(typeof selectors[selector]=="undefined");
  }

  $.fn.extend({
    // watching for element's appearance in browser viewport
    appear: function(callback, options) {
      if(typeof callback != "function"){
        throw("Have to provide a callback: "
          +"$('selector').appear(function()....");
      }
      var defaults = {
        interval: 250
      }
      var index=this.selector;
      if(index==""){
        throw("Can't use an empty selector with this function.");
      }
      $.extend(defaults, options || {});
      var exist=checkExist(index);
      if(!exist){
        selectors[index]=defaults;
      }
      var checkBind=compare(defaults,
        selectors[index]);
      selectors[index]=defaults;
      var p={
        checkLock:false,
        filterName:(defaults.fullView)?":fully-appeared":":appeared",
        callback:callback,
        elements:this
      }
      if ((!checkBind)||(!exist)) {
        $(window).off("scroll."+index,on_check)
          .on("resize."+index,on_check);
        var on_check = function() {
          if (p.checkLock) {
            return;
          }
          p.checkLock = true;
          setTimeout(function(){
            process(p);
          }, defaults.interval);
        };

        $(window).on("scroll."+index,on_check)
          .on("resize."+index,on_check);
      }

      if (options && options.force_process) {
        setTimeout(process, defaults.interval);
      }
      return $(this.selector);
    }
  });

  $.extend({
    // force elements's appearance check
    force_appear: function() {
      if (check_binded) {
        process();
        return true;
      };
      return false;
    }
  });
})(jQuery);