#!/usr/bin/env python3
"""post data to scicat"""
import urllib.parse
import requests

import keyring


class CreateFixture:
    """create fixture"""
    archive_access_token = ""
    ingestor_access_token = ""
    base_url = "https://scitest.esss.lu.se/api/v3/"
    login_url = base_url + "Users/login"
    datasets_url = base_url + "Datasets/"

    def __init__(self):
        password = keyring.get_password("scicat", "archiveManager")
        data = {"username": "archiveManager", "password": password}
        response = requests.post(url=self.login_url, json=data)
        json_response = response.json()
        print(json_response)
        self.archive_access_token = json_response["id"]

        password = keyring.get_password("scicat", "ingestor")
        data = {"username": "ingestor", "password": password}
        response = requests.post(url=self.login_url, json=data)
        json_response = response.json()
        print(json_response)
        self.ingestor_access_token = json_response["id"]

    def create(self):
        """main"""
        pid = urllib.parse.quote_plus("20.500.12269/"+"panosc1")
        url = self.datasets_url + pid + "?access_token=" + self.archive_access_token
        response = requests.delete(url=url)
        print(response.json())

        url = self.datasets_url + "?access_token="+self.ingestor_access_token
        copper = {
            "accessGroups": ["ess"],
            "contactEmail": "fmdk",
            "creationTime": "2020-03-10T22:00",
            "datasetName": "PaNOSC test data",
            "isPublished": True,
            "owner": "hw",
            "ownerGroup": "ess",
            "pid": "panosc1",
            "principalInvestigator": "hw",
            "scientificMetadata": {
                "chemical_formula": {"type": "string", "value": "Cu", "unit": ""},
                "sample_state": {"type": "string", "value": "solid", "unit": ""}
            },
            "sourceFolder": "/nfs",
            "type": "raw",
        }
        response = requests.post(url=url, json=copper)
        print(response.json())


def main():
    """xx"""
    create = CreateFixture()
    create.create()


if __name__ == "__main__":
    main()
