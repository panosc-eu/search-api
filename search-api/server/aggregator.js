module.exports = Aggregator;

function Aggregator(results, method, callback) {
  if (method == 'count') {
    let mergedResults = 0;
    for (let result of results) {
      if (result != null) {
        mergedResults += result;
      }
    }
    callback(null, mergedResults);
  } else {
    let mergedResults = new Array();
    for (let result of results) {
      if (result != null) {
        mergedResults = mergedResults.concat(result);
      }
    }
    if (method == 'findById') {
      if (mergedResults.length > 0) {
        callback(null, mergedResults[0]);
      } else {
        callback(null, null);
      }
    } else {
      callback(null, mergedResults);
    }
  }
}
