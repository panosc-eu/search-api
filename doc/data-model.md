# The data model

The data model consists of ten classes

- `Affiliation` - information about which facility a member is located at
- `Dataset` - information about an experimental run, including optional File, Sample, Instrument and Technique
- `Document` - proposal which includes the dataset or published paper which references the dataset
- `File` - name of file and optionally location
- `Instrument` - beam line where experiment took place
- `Member` - proposal team member or paper co-author
- `Parameter` - scalar measurement with value and units
- `Person` - human who carried out experiment
- `Sample` - extract of material used in the experiment
- `Technique` - common name of scientific method used

https://confluence.panosc.eu/display/wp3/Data+Model

## General remarks

- Classes that may be returned by API calls have a `id` property
  allowing to refer to them in subsequent calls like `GET /datasets/{id}`.
  This id is a purely internal identifier of the local metadata
  catalogue. It is considered ephemeral and should not be retained by
  the client beyond the current session. The value should be
  restricted to the characters `0-9A-Za-z_.~-`.

- Some classes have a `pid` property. This is a persistent identifier
  that is supposed to be stable and may be stored in the client for
  later referal. It also allows cross references to objects in remote
  repositories. The value should be a well established persistent
  identifier such as a DOI, a Handle, an ORCID-iD, or a ROR. If such
  a PID is not available for the object, a locally assigned identifier
  in the metadata catalogue is acceptable, as long as it is guaranteed
  to be stable.

---

## Contents

1. [Affiliation](#affiliation)
2. [Dataset](#dataset)
3. [Document](#document)
4. [File](#file)
5. [Instrument](#instrument)
6. [Member](#member)
7. [Parameter](#parameter)
8. [Person](#person)
9. [Sample](#sample)
10. [Technique](#technique)

---

## Affiliation

Information about which facility a member is located at.

### Relationships

| Card | Class  | Field        |
| ---- | ------ | ------------ |
| 0,\* | Member | members |

### Properties

| Field   | Type   | Mandatory | Comment |
| ------- | ------ | --------- | ------- |
| name    | String | no        |         |
| id      | String | no        |         |
| address | String | no        |         |
| city    | String | no        |         |
| country | String | no        |         |

---

## Dataset

Information about an experimental run, including optional File,
Sample, Instrument and Parameters.

### Relationships

| Card | Class      | Field      |
| ---- | ---------- | ---------- |
| 1,\* | Document   | documents  |
| 1,\* | Technique  | techniques |
| 0,1  | Instrument | instrument |
| 0,\* | File       | files      |
| 0,\* | Parameter  | parameters |
| 0,\* | Sample     | samples    |

### Properties

| Field        | Type    | Mandatory | Comment                      |
| ------------ | ------- | --------- | ---------------------------- |
| pid          | String  | yes       |                              |
| title        | String  | yes       |                              |
| isPublic     | Boolean | yes       |                              |
| creationDate | Date    | yes       |                              |
| size         | Integer | no        | Size of the dataset in bytes |

---

## Document

Represents a scientific proposal or publication.

### Relationships

| Card | Class     | Field      |
| ---- | --------- | ---------- |
| 1,\* | Dataset   | datasets   |
| 0,\* | Member    | members    |
| 0,\* | Parameter | parameters |

### Properties

| Field       | Type            | Mandatory | Comment                                                                                              |
| ----------- | --------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| pid         | String          | yes       |                                                                                                      |
| isPublic    | Boolean.        | yes       |                                                                                   |
| type        | String          | yes       |                                                                                                      |
| title       | String          | yes       |                                                                                                      |
| summary     | String          | no        |                                                                                                      |
| doi         | String          | no        |                                                                                  |
| startDate   | Date            | no        |                                                                                                      |
| endDate     | Date            | no        |                                                                                                      |
| releaseDate | Date            | no        | Date when this document will become openly accessible                                                |
| license     | String          | no        | Use [SPDX license identifier](http://www.spdx.org/licenses) if applicable, e.g. CC0-1.0 or CC-BY-4.0 |
| keywords    | list of strings | no        |                                                                                                      |

---

## File

Name of file and optionally location.

### Relationships

| Card | Class   | Field |
| ---- | ------- | ----- |
| *,1  | Dataset |   dataset |

### Properties

| Field | Type    | Mandatory | Comment         |
| ----- | ------- | --------- | --------------- |
| id    | String  | yes       |                 |
| name  | String  | yes       |                 |
| path  | String  | no        |                 |
| size  | Integer | no        | Number of bytes |

---

## Instrument

Beam line where experiment took place.

### Relationships

| Card | Class   | Field    |
| ---- | ------- | -------- |
| 0,\* | Dataset | datasets |

### Properties

| Field    | Type   | Mandatory | Comment   |
| -------- | ------ | --------- | --------- |
| pid      | String | yes       |           |
| name     | String | yes       | e.g. Loki |
| facility | String | yes       | e.g. ESS  |

---

## Member

Proposal team member or paper co-author.

### Relationships

| Card | Class       | Field        |
| ---- | ----------- | ------------ |
| 1,1  | Document    | document     |
| 0,1  | Person      | person       |
| 0.1  | Affiliation | affiliation  |

### Properties

| Field | Type   | Mandatory | Comment |
| ----- | ------ | --------- | ------- |
| role  | String | no        |         |

---

## Parameter

### Relationships

| Card | Class    | Field    |
| ---- | -------- | -----    |
| 0,1  | Dataset  | dataset  |
| 0,1  | Document | document |

Note: a parameter is either related to a dataset or a document, but
not both.

### Properties

| Field | Type             | Mandatory        | Comment  |
| ----- | ---------------- | ---------------- | -------- |
| name  | String           | yes              |          |
| value | Number or String | yes              | e.g. 22  |
| unit  | String           | where applicable | e.g. bar |

Note: the value may be either a number or a string.  We rely on JSON
using double quotes for strings (e.g. `{ "name": "detector1_name",
"value": "incoming_beam" }` versus `{ "name": "detector1_data",
"units": "A", "value": 3.38e-05 }`) to distinguish either.

---

## Person

Human who carried out experiment.

### Relationships

| Card | Class  | Field |
| ---- | ------ | ----- |
| 0,\* | Member | members |

### Properties

| Field        | Type   | Mandatory | Comment |
| ------------ | ------ | --------- | ------- |
| id           | String | yes       |         |
| fullName     | String | yes       |         |
| orcid        | String | no        |         |
| researcherId | String | no        |         |
| firstName    | String | no        |         |
| lastName     | String | no        |         |

---

## Sample

Extract of material used in the experiment.

### Relationships

| Card | Class   | Field    |
| ---- | ------- | -------- |
| 0,\* | Dataset | datasets |

### Properties

| Field       | Type   | Mandatory | Comment |
| ----------- | ------ | --------- | ------- |
| name        | String | yes       |         |
| pid         | String | yes       |         |
| description | String | no        |         |

---

## Technique

Common name of scientific method used.

### Relationships

| Card | Class   | Field |
| ---- | ------- | ----- |
| 0,\* | Dataset | datasets |

### Properties

| Field    | Type   | Mandatory | Comment                |
| -------- | ------ | --------- | ---------------------- |
| pid      | String | yes       |                        |
| name     | String | yes       |                        |
| panetId  | String | no        | purl of the PaNET item |
