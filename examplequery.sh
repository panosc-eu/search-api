#!/usr/bin/env bash
curl -g -X GET "http://localhost:3000/datasets?filter[where][pressure.value][gt]=50&filter[limit]=10&filter[skip]=0" -H "accept: application/json"
