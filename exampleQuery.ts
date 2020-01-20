import * as request from 'request-promise-native';

(async () => {
  const baseUrl = 'http://localhost:3000/datasets?filter=';
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
          value: 7000000,
          unit: 'kg/m*s2',
        },
      ],
      offset: 0,
      limit: 10,
      skip: 0,
      order: "data ASC"
    },
  };

  /*
  const query2 = {
    where: {
      variable: "pressure",
      operator: "gt",
      value: 7000000,
      unit: 'kg/m*s2',
    }
  }
  */

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
