var GameOfLife = function(canvasEl, options = {}) {
  // References to page canvas and window
  var canvas = canvasEl;
  var windowRef = (options.windowRef) || window;

  // Game options
  var minNeighbors = (options.minNeighbors) || 2;
  var maxNeighbors = (options.maxNeighbors) || 3;

  // Game settings
  var frameCounter = 0;
  var frameFreq = (options.frameFrequency) || 5;
  var genFrequency = (options.generationFrequency) || 8;
  var playing = (options.start) || false;

  // Board settings
  var rows = (options.rows) || 70;
  var cols = (options.cols) || 50;
  var cellSize = (options.cellSize) || 10;
  var autoSize = (options.autoSize) || true;

  // Set up board
  var board = new Board(canvas, cellSize);
  board.setClickCallback(boardClicked); // Set function to fire after board is clicked
  if (autoSize) {
    // Set up autosizing
    board.resize(resizeGame); // Sets rows and cols
    windowRef.addEventListener('resize', function() {
      board.resize(resizeGame);
    }, false);
  }

  // Set up generations
  var currentGen = new Generation(rows, cols);
  var genGhosts = [];
  var maxGens = 5;

  // Advance to next generation
  function updateGen() {
    var nextGen = new Generation(rows, cols);
    for (var x = 0; x <= rows; x++) {
      for (var y = 0; y <= cols; y++) {
        var neighbors = currentGen.neighborCount(x, y);
        // If the cell was alive in previous gen...
        if (currentGen.aliveAt(x, y)) {
          // And if the cell had exactly 2 or 3 neighbors...
          if (neighbors >= minNeighbors && neighbors <= maxNeighbors) {
            // Cell lives on in the next generation
            nextGen.add(x, y);
          }
        }
        // If the cell was dead in previous gen...
        else {
          // Three neighboring cells give birth
          if (neighbors == 3) {
            nextGen.add(x, y);
          }
        }
      }
    }

    // Maintain a list of past generations
    genGhosts.push(currentGen);
    if (genGhosts.length >= maxGens)
      genGhosts.shift();
    currentGen = nextGen;
  }

  // Update game board with current game state
  function updateBoard() {
    // Clear the canvas
    board.clear();

    // Draw older gen ghosts
    var colors = ["#777777", "#999999", "#BBBBBB", "#DDDDDD", "#EEEEEE"];
    for (var gen = 0; gen < genGhosts.length; gen++) {
      drawGen(genGhosts[gen], colors[gen]);
    }

    // Draw current gen
    drawGen(currentGen, "#555555");
  }

  // Draw generation to game board
  function drawGen(gen, color) {
    for (var x = 0; x <= rows; x++) {
      for (var y = 0; y <= cols; y++) {
        board.drawOutline(x, y, "#CCCCCC");
        // Fill "alive" boxes
        if (gen.aliveAt(x, y)) {
          board.drawCell(x, y, color);
        }
      }
    }
  }

  // Resize game to accomodate new dimensions
  function resizeGame(width, height) {
    rows = Math.floor(width / cellSize);
    cols = Math.floor(height / cellSize );
  }

  // Board click action
  function boardClicked(x, y) {
    currentGen.add(x, y);
  }

  // Game loop
  function cycle() {
    frameCounter++;
    if (frameCounter >= genFrequency) {
      updateGen();
      frameCounter = 0;
    }
    updateBoard();
  }

  return {
    play : function() {
      if (!playing) {
        interval = setInterval(cycle, frameFreq);
        playing = true;
      }
    },

    pause : function() {
      if (playing) {
        clearInterval(interval);
        playing = false;
      }
    },

    toggle : function() {
      if (playing)
        pause();
      else
        play();
    },

    // Manually add cell to the game (at current generation)
    addCell : function(cellX, cellY) {
      if (cellX <= rows && cellY <= cols)
        currentGen.add(cellX, cellY);
    }

  };

};
