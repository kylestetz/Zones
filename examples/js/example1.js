$( function() {

  var $section = $('.section').eq(1);
  var sectionTop = $section.offset().top;
  var sectionBottom = sectionTop + $section.outerHeight();

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
      $hud.html('We are in the zone at value: ' + value.toFixed(4) + ' & position: ' + position);
    }
  });

});