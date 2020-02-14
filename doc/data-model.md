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

## Affiliation

Information about which facility a member is located at.

### Relationships

| Card | Class  | Field |
| ---- | ------ | ----- |
| 1,1  | Member |       |

### Properties

| Field   | Type   | Mandatory | Comment |
| ------- | ------ | --------- | ------- |
| name    | String | yes       |         |
| pid     | String | no        |         |
| address | String | no        |         |
| city    | String | no        |         |
| country | String | no        |         |

---

## Dataset

Information about an experimental run, including optional File,
Sample, Instrument and Technique.

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
| id           | String  | yes       |                              |
| title        | String  | yes       |                              |
| creationDate | Date    | yes       |                              |
| isPublic     | Boolean | yes       |                              |
| pid          | String  | no        |                              |
| size         | Integer | no        | Size of the dataset in bytes |

---

## Document

Represents a scientific proposal or publication.

### Relationships

| Card | Class     | Field      |
| ---- | --------- | ---------- |
| 0,\* | Dataset   | datasets   |
| 0,\* | Member    | members    |
| 0,\* | Parameter | parameters |

### Properties

| Field       | Type            | Mandatory | Comment                                                                                              |
| ----------- | --------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| id          | String          | yes       |                                                                                                      |
| type        | String          | yes       |                                                                                                      |
| title       | String          | yes       |                                                                                                      |
| pid         | String          | no        |                                                                                                      |
| internal    | Boolean         | no        |                                                                                                      |
| summary     | String          | no        |                                                                                                      |
| keywords    | list of strings | no        |                                                                                                      |
| startDate   | Date            | no        |                                                                                                      |
| endDate     | Date            | no        |                                                                                                      |
| releaseDate | Date            | no        | Date when this document will become openly accessible                                                |
| license     | String          | no        | Use [SPDX license identifier](http://www.spdx.org/licenses) if applicable, e.g. CC0-1.0 or CC-BY-4.0 |

---

## File

Name of file and optionally location.

### Relationships

| Card | Class   | Field |
| ---- | ------- | ----- |
| 1,1  | Dataset |       |

### Properties

| Field | Type    | Mandatory | Comment         |
| ----- | ------- | --------- | --------------- |
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
| id       | String | yes       |           |
| name     | String | yes       | e.g. Loki |
| facility | String | yes       | e.g. ESS  |
| pid      | String | no        |           |

---

## Member

Proposal team member or paper co-author.

### Relationships

| Card | Class       | Field        |
| ---- | ----------- | ------------ |
| 1,1  | Document    |              |
| 1,1  | Person      | person       |
| 0.\* | Affiliation | affiliations |

### Properties

| Field | Type   | Mandatory | Comment |
| ----- | ------ | --------- | ------- |
| role  | String | yes       |         |

---

## Parameter

### Relationships

| Card | Class    | Field |
| ---- | -------- | ----- |
| 0,1  | Dataset  |       |
| 0,1  | Document |       |

Note: a parameter is either related to a dataset or a document, but
not both.

### Properties

| Field | Type             | Mandatory        | Comment  |
| ----- | ---------------- | ---------------- | -------- |
| name  | String           | yes              |          |
| value | Number or String | yes              | e.g. 22  |
| units | String           | where applicable | e.g. bar |

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
| 0,\* | Member |       |

### Properties

| Field       | Type   | Mandatory | Comment |
| ----------- | ------ | --------- | ------- |
| givenName   | String | yes       |         |
| familyName  | String | yes       |         |
| pid         | String | no        |         |

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
| id          | String | yes       |         |
| name        | String | yes       |         |
| pid         | String | no        |         |
| description | String | no        |         |

---

## Technique

Common name of scientific method used.

### Relationships

| Card | Class   | Field |
| ---- | ------- | ----- |
| 0,\* | Dataset |       |

### Properties

| Field | Type   | Mandatory | Comment |
| ----- | ------ | --------- | ------- |
| name  | String | yes       |         |
| pid   | String | no        |         |
