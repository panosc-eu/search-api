import * as request from 'request-promise-native';

(async () => {
  const baseUrl = 'http://localhost:3000/datasets/query?filter=';
  const query1 = {
    where: {
      and: [
        {
          variable: 'temperature',
          operator: 'gt',
          value: 0,
          unit: 'degC',
        },
        {
          variable: 'pressure',
          operator: 'gt',
          value: 7,
          unit: 'kg/m*s2',
        },
      ],
      offset: 0,
      limit: 1,
      skip: 0,
    },
  };
  console.log(query1);

  const query2 = {
    where: {
      limit: 1,
    },
  };
  console.log(query2);

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
