#!/bin/bash
#
# Script to ingest the data/db.json file and populate the scoring service
# and test the reference implementation locally with scoring and techniques
#

DATA_FILE="data/db.json"

SCORE_BASE_URL="http://localhost:8000"
DATASET_URL="${SCORE_BASE_URL}/items"

IFS=$'\n';

for dataset in `jq '.models.Dataset[]' ${DATA_FILE}`; do
  temp1=`echo ${dataset:1:${#string}-1} | sed 's#\\\"#\"#g'`
  pid=`echo $temp1 | jq '.pid'`
  pid=`echo ${pid:1:${#string}-1}`
  title=`echo $temp1 | jq '.title'`
  title=`echo ${title:1:${#string}-1}`
  echo "Dataset pid ${pid}, title ${title}"

  echo "curl \
    -X POST \
    -H \"Content-Type: application/json\" \
    -d '{\"id\":\"${pid}\", \"group\":\"Dataset\", \"fields\":{ \"title\":\"${title}\"} }' \
    ${DATASET_URL}"

done
