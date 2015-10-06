// To exectute, run "runTests()" in console.
function runTests() {
  var nCase1 = {
    top_left: 0,      top: 0,                   top_right: 1,
    left: 0,          cell: {x: 10, y: 10},     right: 0,
    bottom_left: 0,   bottom: 0,                bottom_right: 0
  }
  var nCase2 = {
    top_left: 0,      top: 0,                   top_right: 1,
    left: 0,          cell: {x: 10, y: 10},     right: 0,
    bottom_left: 1,   bottom: 0,                bottom_right: 0
  }
  var nCase3 = {
    top_left: 1,      top: 0,                   top_right: 0,
    left: 0,          cell: {x: 10, y: 10},     right: 0,
    bottom_left: 0,   bottom: 1,                bottom_right: 1
  }
  var nCase6 = {
    top_left: 1,      top: 1,                   top_right: 1,
    left: 0,          cell: {x: 10, y: 10},     right: 0,
    bottom_left: 1,   bottom: 1,                bottom_right: 1
  }
  var nCase8 = {
    top_left: 1,      top: 1,                   top_right: 1,
    left: 1,          cell: {x: 10, y: 10},     right: 1,
    bottom_left: 1,   bottom: 1,                bottom_right: 1
  }
  testNeighborCount(nCase1, 1);
  testNeighborCount(nCase2, 2);
  testNeighborCount(nCase3, 3);
  testNeighborCount(nCase6, 6);
  testNeighborCount(nCase8, 8);
  printTestResults();
}
