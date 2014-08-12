Zones
=====

~ A scrolling animation design pattern.

No jQuery required!

Scroll-dependent animations can be awesome, but they represent an engineering challenge: how do you animate multiple elements from a scroll handler without killing performance? No, your site will probably not crash and catch fire with bad scroll handlers, but the difference between 20-30 frames per second and 60 is very noticeable. Zones is a little pattern for helping to optimize your scrolling animations and, as a result, your website's responsiveness. Use in conjunction with Google Chrome's Timeline tool to get serious about your rendering performance.

**Zones is** a set of functions that provide useful callbacks from scroll events. They have no relationship to the DOM, so you are free to use these tools in whatever way makes sense for you.

**Zones is not** a one-function black magic do-the-animations-for-you plugin. You provide the hard work.

API
===

Pass in a top value, a bottom value, and an object with some callbacks. All callbacks are optional.

```javascript
// in vanilla JS
new Zone(top, bottom, options);
new Zone(top, bottom, withinCallback);
new Zone(top, bottom, options, withinCallback);
// using zones.jquery.js
$('#section').Zone(options);
$('#section').Zone(withinCallback);
```

```javascript
var topValue = 1000;
var bottomValue = 4000;

var myZone = new Zone(topValue, bottomValue, {
  above: function() {
    // called once per exit, only when exiting above the zone
    console.log('We are above the zone.');
  },
  below: function() {
    // called once per exit, only when exiting below the zone
    console.log('We are below the zone.');
  },
  enter: function(value, position) {
    // called once per entrance
    console.log('enter');
  },
  exit: function() {
    // called once per exit regardless of the direction
    console.log('exit');
  },
  within: function(value, position) {
    // called continuously for any position within the zone.
    // value is a number from 0 - 1 where 0 = topValue and 1 = bottomValue.
    // position is the window's scroll position, which will go from topValue to bottomValue.
    console.log('We are in the zone at value: ' + value.toFixed(4) + ' & position: ' + position);
  }
});
```

You can also pass a top value, a bottom value, and the `within` callback as a third argument.
This is good if you just want the `value` without any entering or exiting callbacks.

```javascript
var myZone = new Zone(topValue, bottomValue, function(value, position) {
  // called continuously for any position within the zone.
  // value is a number from 0 - 1 where 0 = topValue and 1 = bottomValue.
  // position is the window's scroll position, which will go from topValue to bottomValue.
  console.log('We are in the zone at value: ' + value.toFixed(4) + ' & position: ' + position);
});
```
Using `zones.jquery.js` in conjunction with `zones.js` we can call `Zone` on a DOM element and a Zone will be created using the top and bottom of the element. `this` is set to the DOM element within each callback.

```javascript
$('#mySection').Zone({
  above: function() {
    // called once per exit, only when exiting above the zone
    console.log('We are above the zone.');
  },
  below: function() {
    // called once per exit, only when exiting below the zone
    console.log('We are below the zone.');
  },
  enter: function(value, position) {
    // called once per entrance
    console.log('enter');
  },
  exit: function() {
    // called once per exit regardless of the direction
    console.log('exit');
  },
  within: function(value, position) {
    // called continuously for any position within the zone.
    // value is a number from 0 - 1 where 0 = topValue and 1 = bottomValue.
    // position is the window's scroll position, which will go from topValue to bottomValue.
    console.log('We are in the zone at value: ' + value.toFixed(4) + ' & position: ' + position);
    console.log('The element in view is:', this);
  }
});
```

Philosophy
==========

Don't write jQuery selectors within scroll handlers! Cache everything into variables.

The `within` callback is where things get animated. This is where you would `transform: translate3d()` and write continuously updating css. Everything else, include adding `show`/`hide` classes, toggling things on and off, and setting up states, should be done in the one-time callbacks `above`, `below`, `enter`, and `exit`.

Write more & smaller Zones. Four efficient Zones will outperform one large Zone with four conditional statements and reduce the chance for programmer error.

Easing can be performed by applying an easing function to the `value` passed into the `within` callback. This can be used to create non-linear, bouncey, and generally-less-robotic-looking animations.

Todo
====

Resizing the window will not update the zones. This can be handled for the jQuery plugin but there should be a callback/set of callbacks for dealing with height recalculation on resize for vanilla JS Zones.