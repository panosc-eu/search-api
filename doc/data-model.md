# The data model

The data model consists of ten models
* `Affiliation` - information about which facility a member is located at
* `Dataset` - information about an experimental run, including optional File, Sample, Instrument and Technique
* `Document` - proposal which includes the dataset or published paper which references the dataset
* `File` - name of file and optionally location
* `Instrument` - beam line where experiment took place
* `Member` - proposal team member or paper co-author
* `Parameter` - scalar measurement with value and units
* `Person` - human who carried out experiment
* `Sample` - extract of material used in the experiment
* `Technique` - common name of scientific method used

https://confluence.panosc.eu/display/wp3/Data+Model

---

## Affiliation

Information about which facility a member is located at.

### Relationships

| Card | Class  | Field  |
| ---- | ------ | ------ |
| 1,1  | Member | member |

### Properties

| Field   | Type   | Mandatory | Comment |
| ------- | ------ | --------- | ------- |
| id      | String | no        |         |
| name    | String | no        |         |
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
| 1,1  | Document   | document   |
| 0,1  | Instrument | instrument |
| 0,*  | File       | files      |
| 0,*  | Parameter  | parameters |
| 0,*  | Sample     | samples    |
| 0,*  | Technique  | techniques |

### Properties

| Field        | Type    | Mandatory | Comment                      |
| ------------ | ------- | --------- | ---------------------------- |
| pid          | String  | yes       |                              |
| title        | String  | yes       |                              |
| creationDate | Date    | yes       |                              |
| isPublic     | Boolean | yes       |                              |
| size         | Integer | no        | Size of the dataset in bytes |

---

## Document

Represents a scientific proposal or publication.

### Relationships

| Card | Class     | Field      |
| ---- | --------- | ---------- |
| 0,*  | Dataset   | datasets   |
| 0,*  | Member    | members    |
| 0,*  | Parameter | parameters |

### Properties

| Field       | Type    | Mandatory | Comment        |
| ----------- | ------- | --------- | -------------- |
| pid         | String  | yes       |                |
| type        | String  | yes       |                |
| title       | String  | yes       |                |
| internal    | Boolean | no        |                |
| summary     | String  | no        |                |
| doi         | String  | no        |                |
| startDate   | Date    | no        |                |
| endDate     | Date    | no        |                |
| releaseDate | Date    | no        |                |
| license     | String  | no        | e.g. CC-BY-4.0 |

---

## File

Name of file and optionally location.

### Relationships

| Card | Class   | Field   |
| ---- | ------- | ------- |
| 1,1  | Dataset | dataset |

### Properties

| Field   | Type    | Mandatory | Comment         |
| ------- | ------- | --------- | --------------- |
| id      | String  | yes       |                 |
| name    | String  | yes       |                 |
| path    | String  | no        |                 |
| size    | Integer | no        | Number of bytes |

---

## Instrument

Beam line where experiment took place.

### Relationships

| Card | Class   | Field    |
| ---- | ------- | -------- |
| 0,*  | Dataset | datasets |

### Properties

| Field    | Type    | Mandatory | Comment    |
| -------- | ------- | --------- | ---------- |
| id       | String  | yes       | e.g. a DOI |
| name     | String  | yes       | e.g. Loki  |
| facility | String  | yes       | e.g. ESS   |

---

## Member

Proposal team member or paper co-author.

### Relationships

| Card | Class       | Field        |
| ---- | ----------- | ------------ |
| 1,1  | Document    | document     |
| 1,1  | Person      | person       |
| 0.*  | Affiliation | affiliations |

### Properties

| Field    | Type    | Mandatory | Comment |
| -------- | ------- | --------- | ------- |
| role     | String  | yes       |         |

---

## Parameter

### Relationships

| Card | Class       | Field        |
| ---- | ----------- | ------------ |
| 0,1  | Dataset     | dataset      |
| 0,1  | Document    | document     |

Note: a parameter is either related to a dataset or a document, but
not both.

### Properties

| Field    | Type    | Mandatory        | Comment              |
| -------- | ------- | ---------------- | -------------------- |
| name     | String  | yes              | e.g. sample_pressure |
| value    | Number  | yes              | e.g. 22              |
| units    | String  | where applicable | e.g. bar             |

---

## Person

Human who carried out experiment.

### Relationships

| Card | Class  | Field   |
| ---- | ------ | ------- |
| 0,*  | Member | members |

### Properties

| Field        | Type    | Mandatory | Comment  |
| ------------ | ------- | --------- | -------- |
| id           | String  | no        |          |
| name         | String  | no        |          |
| surname      | String  | no        |          |
| orcidId      | String  | no        |          |
| researcherId | String  | no        |          |
| publication  | String  | no        |          |

---

## Sample

Extract of material used in the experiment.

### Relationships

| Card | Class   | Field    |
| ---- | ------- | -------- |
| 0,*  | Dataset | datasets |

### Properties

| Field       | Type    | Mandatory | Comment  |
| ----------- | ------- | --------- | -------- |
| name        | String  | yes       |          |
| doi         | String  | no        |          |
| description | String  | no        |          |

---

## Technique

Common name of scientific method used.

### Relationships

| Card | Class   | Field    |
| ---- | ------- | -------- |
| 0,*  | Dataset | datasets |

### Properties

| Field | Type    | Mandatory | Comment  |
| ----- | ------- | --------- | -------- |
| pid   | String  | yes       |          |
| name  | String  | yes       |          |
