#!/bin/bash
#
# run panosc federated aggragator locally
# only for testing purposes

clear

export PROVIDERS="https://icatplus.esrf.fr/api,https://scicat.ess.eu/panosc-api,https://fairdata.ill.fr/fairdata/api"

cd search-api

node .
