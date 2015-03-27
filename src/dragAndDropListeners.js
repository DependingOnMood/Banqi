// You need to define a single method:
// function handleDragEvent(type, clientX, clientY) {...}
// type is either: "touchstart", "touchmove", "touchend", "touchcancel", "touchleave"
(function () {
  'use strict';

  var isMouseDown = false;

  function touchHandler(event) {
    var touch = event.changedTouches[0];
    handleEvent(event, event.type, touch.clientX, touch.clientY);
  }

  function mouseDownHandler(event) {
    isMouseDown = true;
    handleEvent(event, "touchstart", event.clientX, event.clientY);
  }

  function mouseMoveHandler(event) {
    if (isMouseDown) {
      handleEvent(event, "touchmove", event.clientX, event.clientY);
    }
  }

  function mouseUpHandler(event) {
    isMouseDown = false;
    handleEvent(event, "touchend", event.clientX, event.clientY);
  }

  function handleEvent(event, type, clientX, clientY) {
    event.preventDefault();
    console.log("handleDragEvent:", type, clientX, clientY);
    handleDragEvent(type, clientX, clientY);
  }

  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);
  document.addEventListener("touchleave", touchHandler, true);
  document.addEventListener("mousedown", mouseDownHandler, true);
  document.addEventListener("mousemove", mouseMoveHandler, true);
  document.addEventListener("mouseup", mouseUpHandler, true);
})();
