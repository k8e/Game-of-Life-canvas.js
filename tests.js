var results = {
  total: 0,
  bad: 0
};
function testCountNeighbors(map, expected) {
  results.total++;
  var result;
  clearMap();
  drawToCanvas();
  pause();
  birthCell(map.cell.x, map.cell.y);
  if (map.top_left)       { birthCell((map.cell.x)-1,(map.cell.y)-1); }
  if (map.top)            { birthCell((map.cell.x),(map.cell.y)-1); }
  if (map.top_right)      { birthCell((map.cell.x)+1,(map.cell.y)-1); }
  if (map.left)           { birthCell((map.cell.x)-1,(map.cell.y)); }
  if (map.right)          { birthCell((map.cell.x)+1,(map.cell.y)); }
  if (map.bottom_left)    { birthCell((map.cell.x)-1,(map.cell.y)+1); }
  if (map.bottom)         { birthCell((map.cell.x),(map.cell.y)+1); }
  if (map.bottom_right)   { birthCell((map.cell.x)+1,(map.cell.y)+1); }
  updatePrevState();
  result = countNeighbors(map.cell.x, map.cell.y);
  if (result !== expected) {
    results.bad++;
    console.log("Test countNeighbors: Expected " + expected + ", but got " + result);
  }
}
function printTestResults() {
  console.log("Out of " + results.total + " tests, "
  + results.bad + " failed, "
  + (results.total - results.bad) + " passed.");
}
