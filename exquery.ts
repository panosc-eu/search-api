import * as request from 'request-promise-native';

(async () => {
  const baseUrl = 'http://localhost:3000/datasets';
  const query = {"where" };
  const encode_query = encodeURIComponent();
  const queryString = '';
  var options = {
    uri: baseUrl + queryString,
  };

  const result = await request.get(options);
  console.log(result);
})();
