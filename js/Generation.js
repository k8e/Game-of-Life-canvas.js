var Generation = function(numRows, numCols) {
  // The game map (a 2D grid)
  var map;

  // Number of rows and columns
  var rows = numRows;
  var cols = numCols;

  // Set up map
  initMap();

  function initMap() {
    // Create the game board map,
    //    initializing every space to false
    map = [];
    for (var x = 0; x <= rows; x++) {
      map[x] = [];
      for (var y = 0; y <= cols; y++) {
        map[x][y] = false;
      }
    }
  }

  return {
    // Add cell to map at given location
    add: function(cellX, cellY) {
      if (cellX <= rows && cellY <= cols)
        map[cellX][cellY] = true;
    },

    // Remove cell from map at given location
    remove: function(cellX, cellY) {
      if (cellX <= rows && cellY <= cols)
        map[cellX][cellY] = false;
    },

    // Check if cell is alive at given location
    aliveAt: function(cellX, cellY) {
      if (cellX <= rows && cellY <= cols)
        return map[cellX][cellY];
      else
        return false;
    },

    // Count living neighbors around cell at given location
    neighborCount : function(cellX, cellY) {
      var total = 0;
      for (var offsetX = -1; offsetX <= 1; offsetX++) {
        for (var offsetY = -1; offsetY <= 1; offsetY++) {
          // If a potential neighboring spot exists...
          if ( !( cellX + offsetX == -1
                || cellY + offsetY == -1
                || cellX + offsetX > rows - 1
                || cellY + offsetY > cols - 1 ) ) {
            // And if the spot contains a neighbor...
            if ( map[cellX + offsetX][cellY + offsetY]
                  && !( offsetX == 0 && offsetY == 0 ) ) {
                total++;  // Count neighbor
            }
          }
        }
      }
      return total;
    },

    // Reset map
    reset : function() {
      initMap();
    }

  };

};