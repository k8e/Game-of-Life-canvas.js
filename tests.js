var results = {
  total: 0,
  bad: 0
};
function testNeighborCount(map, expected) {
  results.total++;
  var result;
  clearMap();
  drawToCanvas();
  pause();
  addCell(map.cell.x, map.cell.y);
  if (map.top_left)       { addCell((map.cell.x)-1,(map.cell.y)-1); }
  if (map.top)            { addCell((map.cell.x),(map.cell.y)-1); }
  if (map.top_right)      { addCell((map.cell.x)+1,(map.cell.y)-1); }
  if (map.left)           { addCell((map.cell.x)-1,(map.cell.y)); }
  if (map.right)          { addCell((map.cell.x)+1,(map.cell.y)); }
  if (map.bottom_left)    { addCell((map.cell.x)-1,(map.cell.y)+1); }
  if (map.bottom)         { addCell((map.cell.x),(map.cell.y)+1); }
  if (map.bottom_right)   { addCell((map.cell.x)+1,(map.cell.y)+1); }
  updatePrevState();
  result = neighborCount(map.cell.x, map.cell.y);
  if (result !== expected) {
    results.bad++;
    console.log("Test neighborCount: Expected " + expected + ", but got " + result);
  }
}
function printTestResults() {
  console.log("Out of " + results.total + " tests, "
  + results.bad + " failed, "
  + (results.total - results.bad) + " passed.");
}
