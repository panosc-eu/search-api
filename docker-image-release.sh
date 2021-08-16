#!/usr/bin/env bash
#
# script filename
SCRIPT_NAME=$(basename $BASH_SOURCE)
echo ""
echo ""

#
# check that we got two arguments in input
if [ "$#" -ne 2 ] && [ "$#" -ne 3 ]; then
    echo "Usage ${SCRIPT_NAME} <account> <env> (<commit>)"
    echo ""
    echo " prepare a docker image and push it to the dockerhub repo <account>/panosc-federated-search"
    echo ""
    echo " arguments:"
    echo " - account = account on docker hub"
    echo " - env     = dev(lopment) or prod(oduction) environment"
    echo " - commit  = git commit we would like to use to create the image"
    echo "             if not specified it uses the latest commit"
    echo ""
    exit 1
fi

# extract input argument
account=$1
env=$2
gitTag=$3

# code repository and branch
gitRepo=https://github.com/panosc-eu/search-api.git
branch=dev/federated_search_api

# docker repository
dockerRepo=${account}/panosc-federated-search

# retrieve latest git commit tag
if [ "-${gitTag}-" == "--" ]; then 
    gitTag=$(git rev-parse HEAD)
fi


# docker image tag
dockerTag="${gitTag}${env}"
dockerImage="${dockerRepo}:${dockerTag}"

#
# gives some feedback to the user
echo "Account          : ${account}"
echo "Environment      : ${env}"
echo "Git commit tag   : ${gitTag}"
echo "Docker image tag : ${dockerTag}"
echo "Docker image     : ${dockerImage}"
echo ""

#
# create docker image
# if it is already present, remove old image
if [[ "$(docker images -q ${dockerImage} 2> /dev/null)" != "" ]]; then
    echo "Image already present. Removing it and recreating it"
    docker rmi ${dockerImage}
    echo ""
fi
echo "Creating image"
docker build -t ${dockerImage} -f ./search-api/Dockerfile ./search-api 
echo ""

# push image on docker hub repository
docker push ${dockerImage}
echo ""
echo "Done"
echo ""


