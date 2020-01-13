import * as request from 'request-promise-native';

(async () => {
  const baseUrl = 'http://localhost:3000/datasets?filter=';
  const query1 = {
    where: {
      and: {
        temperature: {
          gt: {
            value: 0,
            unit: 'tempC',
          },
        pressure: {
          gt: {
            value: 0,
            unit: 'bar',
          },
        }
      },
    },
  };

  const query = query1;
  console.log(JSON.stringify(query, null, 2));
  const queryString = encodeURIComponent(JSON.stringify(query));
  const options = {
    uri: baseUrl + queryString,
  };
  console.log(options.uri);

  const result = await request.get(options);
  console.log(JSON.parse(result));
})().catch(err => console.log(err));
