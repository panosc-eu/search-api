#!/usr/bin/env bash
curl -g -X GET "http://localhost:3000/datasets?filter[where][and][0][pressure.value][gt]=50&[where][and][1][pressure.unit]=bar&filter[limit]=10&filter[skip]=0" -H "accept: application/json"
