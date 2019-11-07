# search-api

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)


## How to use the search-api

1. Clone the repository

```
git clone git@github.com:panosc-eu/search-api.git
```
2.
```
npm install
```

3.
```
npm start
```

4.
To search for e.g. all datasets where pressure is greater than 50
```
curl -g -X GET "http://localhost:3000/datasets?filter[where][pressure.value][gt]=50&filter[limit]=10&filter[skip]=0" -H "accept: application/json"
```

