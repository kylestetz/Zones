$( function() {

  var $section = $('.section').eq(1);
  var sectionTop = $section.offset().top;
  var sectionBottom = sectionTop + $section.outerHeight() - $(window).height();

  var $hud = $('.hud');

  var middleSectionZone = new Zone(sectionTop, sectionBottom, {
    above: function() {
      $hud.html('We are above the zone.');
    },
    below: function() {
      $hud.html('We are below the zone.');
    },
    enter: function(value, position) {
      console.log('enter');
    },
    exit: function() {
      console.log('exit');
    },
    within: function(value, position) {
      $hud.html('The zone is taking up the full view.');
    }
  });

});