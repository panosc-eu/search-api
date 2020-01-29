The data model consists of ten models
* `Affiliation` - information about which facility a member is located at
* `Dataset` - information about an experimental run, including optional File, Sample, Instrument and Technique
* `Document` - proposal which includes the dataset or published paper which references the dataset
* `File` - name of file and optionally location
* `Instrument` - beam line where experiment took place
* `Member` - proposal team member or paper co-author
* `Parameter` - scalar measurement with value and units
* `Person` - human who carried out experiment
* `Role` - operator, author
* `Sample` - extract of material used in the experiment
* `Technique` - common name of scientific method used


https://confluence.panosc.eu/display/wp3/Data+Model
## Affiliation

The `Affiliation` model has five optional fields
* Id (string)
* Name (string)
* Address (string)
* City (string)
* Country (string)

## Dataset
The `Dataset` model consists of 4 mandatory fields
* Persistent Identifier or PID (string)
* Title (string)
* creation date (date)
* isPublic (boolean)

and an optional field
* size (measurement with units(bytes))

The `Dataset` can have one `Instrument` only and several `Techniques`, `Parameters`, `Files` and `Samples`

## Document
The `Document` model represents a scientific proposal or publication. It can include `Datasets`, `Parameters` and `Members`.
It has three mandatory fields
* PID
* Type
* title

and seven optional fields
* internal (Boolean)
* summary (String)
* DOI (string)
* Start date (date)
* end date (date)
* release date (date)
* license (string, e.g. CC-BY-4.0)

## File

The `File` model has two mandatory fields,
* Id
* name

and two optional
* path 
* size

## Instrument

The `Instrument` model has three mandatory fields, 
* ID (string, e.g. a DOI)
* Name (String, e.g. Loki)
* Facility (string e.g. ESS)

## Member

## Parameter

The `Parameter` model is intended for scientific measurements. It has two mandatory fields
* name (string, e.g. sample_pressure)
* value (number e.g 22)

and one mandatory where applicable field
* units (string e.g. bar)

## Person

## Role


## Technique
The `Technique` model has two mandatory fields
* PID (string)
* name (string) 


In general the API is readonly with no DELETE, POST/PUT or PATCH requests.
