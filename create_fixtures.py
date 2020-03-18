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
        pid_prefix = "20.500.12269/"
        test_pids = ["panosc1", "panosc2", "panosc3"]
        for pid in test_pids:
            full_pid = urllib.parse.quote_plus(pid_prefix + pid)
            url = self.datasets_url + full_pid + "?access_token=" + self.archive_access_token
            response = requests.delete(url=url)
            print(response.json())

        url = self.datasets_url + "?access_token=" + self.ingestor_access_token
        copper = {
            "accessGroups": ["ess"],
            "contactEmail": "fmdk",
            "creationTime": "2020-03-10T22:00",
            "datasetName": "PaNOSC test data",
            "description": "Demo dataset for PaNOSC sample parameters search",
            "isPublished": True,
            "owner": "hw",
            "ownerGroup": "ess",
            "pid": "panosc1",
            "principalInvestigator": "hw",
            "scientificMetadata": {
                "chemical_formula": {"type": "string", "value": "Cu", "unit": ""},
                "sample_state": {"type": "string", "value": "solid", "unit": ""}
            },
            "techniques": [],
            "sourceFolder": "/nfs",
            "type": "raw"
        }
        xray_absoption = {
            "accessGroups": ["ess"],
            "contactEmail": "fmdk",
            "creationTime": "2020-03-10T22:00",
            "datasetName": "PaNOSC test data",
            "description": "Demo dataset for PaNOSC techniques search",
            "isPublished": True,
            "owner": "hw",
            "ownerGroup": "ess",
            "pid": "panosc2",
            "principalInvestigator": "hw",
            "scientificMetadata": {},
            "techniques": [
                {
                    "pid": "panoscTech1",
                    "name": "X-Ray Absorption"
                }
            ],
            "sourceFolder": "/nfs",
            "type": "raw"
        }
        measurements = {
            "accessGroups": ["ess"],
            "contactEmail": "fmdk",
            "creationTime": "2020-03-10T22:00",
            "datasetName": "PaNOSC test data",
            "description": "Demo dataset for PaNOSC techniques search",
            "isPublished": True,
            "owner": "hw",
            "ownerGroup": "ess",
            "pid": "panosc3",
            "principalInvestigator": "hw",
            "scientificMetadata": {
                "photon_energy": {
                    "type": "measurement",
                    "value": 930,
                    "unit": "eV",
                    "valueSI": 1.4900242055e-16,
                    "unitSI": "(kg m^2) / s^2"
                },
                "temperature": {
                    "type": "measurement",
                    "value": 20,
                    "unit": "celsius",
                    "valueSI": 293.15,
                    "unitSI": "kelvin"
                }
            },
            "techniques": [],
            "sourceFolder": "/nfs",
            "type": "raw"
        }
        testDatasets = [copper, xray_absoption, measurements]
        for dataset in testDatasets:
            response = requests.post(url=url, json=dataset)
            print(response.json())


def main():
    """xx"""
    create = CreateFixture()
    create.create()


if __name__ == "__main__":
    main()
