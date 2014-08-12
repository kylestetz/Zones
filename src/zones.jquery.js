$.fn.Zone = function(options, callback) {
  // if there's only one argument it's the callback
  if(arguments.length == 1 && typeof options === 'function') {
    callback = options;
    options = { };
  }
  // top and bottom are based on the element(s) passed in
  $(this).each( function() {
    var thisTop = $(this).offset().top;
    var thisHeight = $(this).outerHeight();
    var newZone = new window.Zone(
      thisTop,
      thisTop + thisHeight,
      $.extend(options, { elContext: this }),
      callback
    );
  });
};