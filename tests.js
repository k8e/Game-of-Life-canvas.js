var results = {
  total: 0,
  bad: 0
};
function testAdd(a, b, expected) {
  results.total++;
  var result = add(a,b);
  if (result !== expected) {
    results.bad++;
    console.log("Test add: Expected " + expected + ", but got " + result);
  }
}
function printTestResults() {
  console.log("Out of " + results.total + " tests, "
  + results.bad + " failed, "
  + (results.total - results.bad) + " passed.");
}
