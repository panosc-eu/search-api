import * as request from 'request-promise-native';

(async () => {
  const baseUrl = 'http://localhost:3000/datasets?fields=';
  const query = {
    where: {and: [{'pressure.value': {gt: 100}}, {sample: 'water'}]},
  };
  const queryString =encodeURIComponent(JSON.stringify(query));
  var options = {
    uri: baseUrl + queryString,
  };
  console.log(options.uri);

  const result = await request.get(options);
  console.log(result);
})();
