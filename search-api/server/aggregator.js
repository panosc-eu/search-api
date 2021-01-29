module.exports = Aggregator;

function compareByScore(a, b) {
  if (a.score < b.score) {
    return 1;
  }
  if (a.score > b.score) {
    return -1;
  }
  return 0;
}

function Sort(mergedResults) {
  return mergedResults.sort(compareByScore)
}

function Aggregator(results, method, callback) {
  if (method == 'count') {
    let mergedResults = 0;
    for (let result of results) {
      if (result != null) {
        mergedResults += result;
      }
    }
    callback(null, mergedResults);
  } else if (method == 'statistics') {
    var parameters = {};
    for (let result of results) {
      if (result != null) {
        for (let parameter of Object.keys(result)) {
          if (parameters[parameter] === undefined) {
            parameters[parameter] = result[parameter];
          } else {
            for (let value of result[parameter]) {
              var availableParameter = undefined;
              for (let statParameter of parameters[parameter]) {
                if (statParameter.value === value.value && statParameter.unit === value.unit) {
                  availableParameter = statParameter;
                }
              }
              if (availableParameter === undefined) {
                parameters[parameter].push(value);
              } else {
                availableParameter.count += value.count;
              }
            }
          }
        }
      }
    }
    callback(null, parameters);
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
      callback(null, Sort(mergedResults));
    }
  }
}
