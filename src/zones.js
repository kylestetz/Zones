(function() {

  // ======================== THE ZONE ========================

  window.Zone = function(top, bottom, options, callback) {
    var self = this;

    self.top = top;
    self.bottom = bottom;
    self.height = self.bottom - self.top;

    self.empty = function(){};

    self.callback = callback || options.within || self.empty;
    self.aboveCallback = options.above || self.empty;
    self.belowCallback = options.below || self.empty;
    self.enterCallback = options.enter || self.empty;
    self.exitCallback  = options.exit  || self.empty;

    self.context = options.elContext || self;

    var outOfArea = false;
    var inArea = false;
    var hasNotBeenCalled = true;

    self.update = function (position) {
      if(position >= self.top && position <= self.bottom) {
        var value = (position - self.top) / self.height;

        if(outOfArea) {
          self.enterCallback.call(self.context, value, position);
        } else if(hasNotBeenCalled) {
          self.enterCallback.call(self.context, value, position);
        }


        outOfArea = false;
        return self.callback.call(self.context, value, position);

      } else {

        if(!outOfArea) {
          outOfArea = true;
          if(position < self.top) {
            // don't call these on page load
            if(!hasNotBeenCalled) {
              self.callback.call(self.context, 0, position);
              self.exitCallback.call(self.context);
            }
            self.aboveCallback.call(self.context);
            return;
          } else if(position > self.bottom) {
            // don't call exit on page load
            if(!hasNotBeenCalled) {
              self.callback.call(self.context, 1, position);
              self.exitCallback.call(self.context);
            }
            self.belowCallback.call(self.context);
            return;
          }
          return self.callback.call(self.context, (position < self.top) ? 0 : 1 , position);
        }

      }

      hasNotBeenCalled = false;
    };

    zoneController.add(self);

    // if the window scroll position is 0 on page load
    // the zones won't fire (because the scroll handler doesn't fire).
    // fire it manually.
    if(window.pageYOffset === 0) {
      self.update(0);
    }
  };


  // =================== THE ZONE CONTROLLER ===================

  function ZoneController() {
    var self = this;
    self.zones = [];

    self.add = function(zone) {
      self.zones.push(zone);
    };

    self.update = function(position) {
      var i = 0;
      for(i; i < self.zones.length; i++) {
        self.zones[i].update(position);
      }
    };

    self.length = function() {
      return self.zones.length;
    };
  }

  // zoneController is NOT exposed globally-
  // there should only ever be one and each Zone
  // should automatically attach itself.
  var zoneController = new ZoneController();


  // ===================== SCROLL HANDLING =====================

  // in case we don't have jquery
  var getScroll = function() {
    return window.pageYOffset;
  };

  if(window.jQuery || window.$) {

    var $window = $(window);

    // use scrolltop instead
    getScroll = function() {
      return $window.scrollTop();
    };

    $window.scroll( function() {
      window.requestAnimationFrame(update);
    });

  } else {

    // no jquery.
    // save whatever was happening before us in the scroll handler
    var superScroll = window.onscroll || function(){ };
    window.onscroll = function() {
      superScroll();
      window.requestAnimationFrame(update);
    };
  }

  // ========================== UPDATE ==========================

  var lastPosition = null;

  function update() {
    var currentPosition = getScroll();

    // only call this if we're scrolling vertically
    if(currentPosition !== lastPosition && zoneController.length()) {
      zoneController.update(currentPosition);
    }

    lastPosition = currentPosition;
  }

})();