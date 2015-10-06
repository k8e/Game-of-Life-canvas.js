// Define number of rows and columns
var rows = 70;
var cols = 50;
// Game board map
var map = new Array();
var prevState;
// Define canvas settings
var canvas = document.getElementById('game_board');
var canvasCtx = canvas.getContext('2d');
canvas.addEventListener('click', canvasClickHandler, false);

// Initialize game map
clearMap(map);
// Initialize cycle interval
var playing = false;
var interval;
play();
// Create first cells
createDefaultCells();

function clearMap() {
  // Create the game board map,
  //    initializing every space to false
  map = new Array();
  for (var x = 0; x <= rows; x++) {
    map[x] = new Array();
    for (var y = 0; y <= cols; y++) {
      map[x][y] = false;
    }
  }
}

function updateGen() {
  // Based on game rules, update map to the next generation
  prevState = map;
  clearMap();
  for (var x = 0; x <= rows; x++) {
    for (var y = 0; y <= cols; y++) {
      var neighbors = neighborCount(x, y);
      // If the cell was alive in previous gen...
      if (prevState[x][y]) {
        if (neighbors < 2) {
          // Less than 2 neighbors; cell dies
          map[x][y] = false;
        } else if (neighbors == 2 || neighbors == 3) {
          // Exactly 2 or 3 neighbors; cell lives
          map[x][y] = true;
        } else if (neighbors > 3) {
          // Over 3 neighbors; cell dies
          map[x][y] = false;
        }
      }
      // If the cell was dead in previous gen...
      else {
        if (neighbors == 3) {
          // Three neighboring cells give birth
          map[x][y] = true;
        }
      }
      // End processing cell
    }
  }
}

function neighborCount(x, y) {
  var total = 0;
    for (var offsetX = -1; offsetX <= 1; offsetX++) {
      for (var offsetY = -1; offsetY <= 1; offsetY++) {
        // Check for invalid array accesses
        if (x + offsetX == -1 || y + offsetY == -1 ||
            x + offsetX > rows - 1 || y + offsetY > cols - 1 )
        {
          // Do nothing
        }
        else {
          if (prevState[x + offsetX][y + offsetY]) {
            if (!(offsetX == 0 && offsetY == 0)) {
              total++;
            }
          }
        }
      }
    }
    return total;
}

function canvasClickHandler(ev) {
  var x = ev.clientX - canvas.offsetLeft;
  var y = ev.clientY - canvas.offsetTop;
  addCell(Math.floor(x / 10), Math.floor(y / 10));
}

function addCell(x, y) {
  map[x][y] = true;
  fillBox(x, y);
}

function cycle() {
  updateGen();
  drawToCanvas();
}

function pause() {
  if (playing) {
    clearInterval(interval);
    playing = false;
  }
}

function play() {
  if (!playing) {
    interval = setInterval(cycle, 200);
    playing = true;
  }
}

function drawToCanvas() {
  // Clear the canvas
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  // Update the canvas
  for (var x = 0; x <= rows; x++) {
    for (var y = 0; y <= cols; y++) {
      // Fill "alive" boxes
      if (map[x][y]) {
        fillBox(x, y);
      }
      // Outline "dead" boxes
      else {
        outlineBox(x, y);
      }
    }
  }
}

function fillBox(x, y) {
  canvasCtx.fillStyle="#555555";
  canvasCtx.fillRect(x * 10, y * 10, 10, 10);
  canvasCtx.strokeStyle="#555555";
  canvasCtx.strokeRect(x * 10, y * 10, 10, 10);
}

function outlineBox(x, y) {
  canvasCtx.strokeStyle="#CCCCCC";
  canvasCtx.strokeRect(x * 10, y * 10, 10, 10);
}

function add(a,b) {
  return a+b;
}

function createDefaultCells() {
  // Star 1
  map[50][10] = true;
  map[51][10] = true;
  map[51][11] = true;
  map[52][10] = true;
  // Star 2
  map[60][20] = true;
  map[60][21] = true;
  map[61][21] = true;
  map[60][22] = true;
  // Supernova
  map[30][25] = true;
  map[30][26] = true;
  map[30][27] = true;
  map[30][28] = true;
  map[30][29] = true;
  map[30][30] = true;
  map[30][31] = true;
  map[30][32] = true;
  map[30][33] = true;
  map[30][34] = true;
  map[30][35] = true;
  map[30][36] = true;
  map[30][37] = true;
}
