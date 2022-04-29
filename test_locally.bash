#!/bin/bash
#
# Script to ingest the data/db.json file and populate the scoring service
# and test the reference implementation locally with scoring and techniques
#

DATA_FILE="data/db.json"

PSS_BASE_URL="http://localhost:8000"
DATASET_URL="${PSS_BASE_URL}/items"
COMPUTE_URL="${PSS_BASE_URL}/compute"
TERMS_URL="${PSS_BASE_URL}/terms"
WEIGHTS_URL="${PSS_BASE_URL}/weights"

PANET_BASE_URL="http://localhost:8001"

IFS=$'\n';


clear
echo "Starting docker containers..."
docker-compose up -d --remove-orphans

echo -e "\n\n"
echo "Waiting for services to be available..."
res=`curl -s -o /dev/null -w"%{http_code}" -X GET -I ${PSS_BASE_URL}`
echo "Http status code : ${res}"
until [ "-${res}-" == "-200-" ]; do
  echo "Sleeping for 5 seconds"
  sleep 5
  res=`curl -s -o /dev/null -w"%{http_code}" -X GET -I ${PSS_BASE_URL}`
  echo "Http status code : ${res}"
done
echo "Services ready"



echo -e "\n\n"
echo "Inserting Datasets score information..."
for dataset in `jq '.models.Dataset[]' ${DATA_FILE}`; do
  echo "------------"
  temp1=`echo ${dataset:1:${#string}-1} | sed 's#\\\"#\"#g'`
  pid=`echo $temp1 | jq '.pid'`
  pid=`echo ${pid:1:${#string}-1}`
  echo "Pid ${pid}"
  title=`echo $temp1 | jq '.title'`
  title=`echo ${title:1:${#string}-1}`
  echo "Title ${title}"
  techniques=`echo $temp1 | jq '.techniques' | jq . -c`
  echo "Techniques ${techniques}"


  data='{"id":"'${pid}'", "group":"Dataset", "fields":{ "title":"'${title}'", "techniques":'${techniques}'} }'
  echo "Command =>curl -X POST -i -L -H \"Content-Type: application/json\" -d '${data}' ${DATASET_URL}<="
  curl \
    -X POST \
    -i -L \
    -H "Content-Type: application/json" \
    -d ${data}\
    ${DATASET_URL}
  res=$?
  echo -e "\n\n"
  echo "Result =>${res}<="
done
echo "...Datasets score information inserted"


echo "Inserting Documents score information..."
for document in `jq '.models.Document[]' ${DATA_FILE}`; do
  echo "------------"
  temp1=`echo ${document:1:${#string}-1} | sed 's#\\\"#\"#g'`
  pid=`echo $temp1 | jq '.pid'`
  pid=`echo ${pid:1:${#string}-1}`
  echo "Pid ${pid}"
  title=`echo $temp1 | jq '.title'`
  title=`echo ${title:1:${#string}-1}`
  echo "Title ${title}"
  type=`echo $temp1 | jq '.type'`
  type=`echo ${type:1:${#string}-1}`
  echo "Type ${type}"


  data='{"id":"'${pid}'", "group":"Dataset", "fields":{ "title":"'${title}'", "type":"'${type}'"} }'
  echo "Command =>curl -X POST -i -L -H \"Content-Type: application/json\" -d '${data}' ${DATASET_URL}<="
  curl \
    -X POST \
    -i -L \
    -H "Content-Type: application/json" \
    -d ${data}\
    ${DATASET_URL}
  res=$?
  echo -e "\n\n"
  echo "Result =>${res}<="
done
echo "...Document score information inserted"
echo -e "\n"

echo "Triggering weights computation..."
echo "Command =>curl -X POST -i -L ${COMPUTE_URL}<="
curl -X POST -i -L ${COMPUTE_URL}
echo -e "\n"

res=`curl -X GET -L ${COMPUTE_URL} 2>/dev/null | jq . | grep progressPercent | sed "s#[ ,]##g" | cut -d: -f2`
while [ "-${res}-" == "-1-" ]; do
  echo "Computation still running... Sleeping for 5 seconds"
  sleep 5
  res=`curl -X GET -L ${COMPUTE_URL} 2>/dev/null | jq . | grep progressPercent | sed "s#[ ,]##g" | cut -d: -f2`
  echo -e "\n"
done
echo "Completed weights computation..."
echo -e "\n"

number_of_terms=`curl -X GET -L ${TERMS_URL} 2>/dev/null | jq . | grep "term" | wc -l`
number_of_weights=`curl -X GET -L ${WEIGHTS_URL} 2>/dev/null | jq . | grep "_id" | wc -l`
echo "Number of terms extracted : " ${number_of_terms}
echo "number of weights computed : " ${number_of_weights}
echo -e "\n\n"

echo "Starting PaNOSC search API - reference implementation"
export PSS_ENABLE=1
export PSS_BASE_URL=${PSS_BASE_URL}
export PANET_BASE_URL=${PANET_BASE_URL}
npm start
