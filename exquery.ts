import * as request from 'request-promise-native';

(async () => {
  const baseUrl = 'http://localhost:3000/datasets?filter=';
  const query = {
    where: {
      and: [{'pressure.value': {gt: 50}}, {'pressure.unit': 'bar'}],
    },
  };
  const queryString = encodeURIComponent(JSON.stringify(query));
  const options = {
    uri: baseUrl + queryString,
  };
  console.log(options.uri);

  const result = await request.get(options);
  console.log(result);
})().catch(err => console.log(err));
