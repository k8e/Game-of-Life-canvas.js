var Board = function(canvasEl, cellSize, options = {}) {
  // Board settings
  var width = (options.width) || 70;
  var height = (options.height) || 40;
  var cellSize = cellSize;

  // Drag and click settings
  var clickCallback;
  var dragging = false;

  // Set up canvas
  var canvas;
  var canvasCtx;
  if (canvasEl) {
    // Define canvas settings
    canvas = canvasEl;
    canvasCtx = canvas.getContext('2d');
    // Link up mouse events
    linkMouseEvents();
  }

  function fillSquare(x, y, color) {
    canvasCtx.fillStyle = color;
    canvasCtx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }

  function outlineSquare(x, y, color) {
    canvasCtx.strokeStyle = color;
    canvasCtx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }

  function linkMouseEvents() {
    canvas.addEventListener('mousedown', boardClick, false);
    canvas.addEventListener('mouseover', boardMouseOver, false);
    canvas.addEventListener('mousemove', boardMouseOver, false);
    canvas.addEventListener('mouseup', boardMouseOut, false);
    canvas.addEventListener('mouseleave', boardMouseOut, false);
  }

  function boardClick(ev) {
    dragging = true;

    // Get callibrated click coordinates
    var x = ev.clientX - canvas.offsetLeft;
    x = Math.floor(x / cellSize);
    var y = ev.clientY - canvas.offsetTop;
    y = Math.floor(y / cellSize);

    // Fire callback with callibrated coordinates
    clickCallback(x, y);
  }

  function boardMouseOver(ev) {
    if (dragging) {
      boardClick(ev);
    }
  }

  function boardMouseOut() {
    dragging = false;
  }

  return {
    // Clear the board
    clear: function() {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    },

    // Place (fill) a cell at given location
    drawCell : function(x, y, color) {
      fillSquare(x, y, color);
    },

    // Outline a cell at given location
    drawOutline : function(x, y, color) {
      outlineSquare(x, y, color);
    },

    // Resize the board with respect to window
    resize: function(callback) {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Call assigned "callback"
      callback(width, height);
    },

    // Sets a callback to be executed after the click handler
    setClickCallback: function(callback) {
      clickCallback = callback;
    }

  };

};