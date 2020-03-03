import * as request from 'request-promise-native';

(async () => {
  const baseUrl = 'http://localhost:3000/documents?filter=';
  const query1 = {
    where: {pid: '10.17199/ESS2'},
    limit: 1,
    skip: 0,
    include: {
      relation: 'datasets',
      scope: {
        where: {
          pid: '20.500.12269/df01c062-2629-4d60-913f-8f62743d37bf',
        },
      },
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
  //console.log("res:",result);
  const json = JSON.parse(result);
  const jsonString = JSON.stringify(json, null, 2);
  console.log(jsonString);
})().catch(err => console.log(err));
