--create schema search_api;
--set schema 'search_api';

create table instrument (
    pid       text primary key,
    name      text not null,
    facility  text,
    score     float
);
create index instrument_name_index on instrument(name);

create table document (
  pid         text primary key,
  ispublic    boolean not null default false,
  type        text not null,
  title       text not null,
  summary     text,
  doi         text,
  startdate   timestamp,
  enddate     timestamp,
  releasedate timestamp,
  license     text,
  keywords    text[],
  acls        varchar[],
  score       float
);
create index document_title_index on document(title);
create index document_type_index on document(type);
create index document_doi_index on document(doi);
create index document_acls_index on document(acls);

create table person (
  id              text primary key,
  firstname       text,
  lastname        text,
  fullname        text,
  orcid           text,
  researcherid    text
);
create index person_firstname_index on person(firstname);
create index person_lastname_index on person(lastname);
create index person_fullname_index on person(fullname);
create index person_orcid_index on person(orcid);
create index person_researcherid_index on person(researcherid);

create table affiliation (
  id            bigserial primary key,
  name          text not null,
  address       text,
  city          text,
  country       text
);
create index affiliation_name_index on affiliation(name);
create index affiliation_city_index on affiliation(city);
create index affiliation_country_index on affiliation(country);

create table member (
  id              bigserial primary key,
  role            text,
  documentid      text not null constraint fk_member_document_id references document,
  personid        text not null constraint fk_member_person_id references person,
  affiliationid   bigint not null constraint fk_member_affiliation_id references affiliation
);
create index member_role_index on member(role);
create index member_documentid_index on member(documentid);
create index member_personid_index on member(personid);
create index member_affiliationid_index on member(affiliationid);

create table dataset (
  pid               text primary key,
  title             text,
  ispublic          boolean not null default false,
  size              float,
  creationdate      timestamp,
  acls              varchar[],
  firstfilenumor    integer,
  lastfilenumor     integer,
  path              text,
  score             float,
  documentid        text not null constraint fk_dataset_document_id references document,
  instrumentid      text not null constraint fk_dataset_instrument_id references instrument
);
create index dataset_title_index on dataset(title);
create index dataset_documentid_index on dataset(documentid);
create index dataset_instrumentid_index on dataset(instrumentid);
create index dataset_acls_index on dataset(acls);

create table file (
  id             bigserial primary key,
  name           text not null,
  path           text not null,
  size           float,
  datasetid      text not null constraint fk_file_dataset_id references dataset
);
create index file_datasetid_index on file(datasetid);

create table parameter (
  id             bigserial primary key,
  name           text not null,
  value          text not null,
  unit           text,
  datasetid      text constraint fk_parameter_dataset_id references dataset,
  documentid     text constraint fk_parameter_document_id references document
);
create index parameter_name_index on parameter(name);
create index parameter_datasetid_index on parameter(datasetid);
create index parameter_documentid_index on parameter(documentid);

create table sample (
  pid            text primary key,
  name           text not null,
  description    text
);
create index sample_name_index on sample(name);

create table technique (
  pid            text primary key,
  name           text not null
);
create index technique_name_index on technique(name);

create table datasetsample (
  id             bigserial primary key,
  datasetid      text not null constraint fk_datasetsample_dataset_id references dataset,
  sampleid       text not null constraint fk_datasetsample_sample_id references sample
);
create index datasetsample_datasetid_index on datasetsample(datasetid);
create index datasetsample_sampleid_index on datasetsample(sampleid);

create table datasettechnique (
  id             bigserial primary key,
  datasetid      text not null constraint fk_datasettechnique_dataset_id references dataset,
  techniqueid    text not null constraint fk_datasettechnique_technique_id references technique
);
create index datasettechnique_datasetid_index on datasettechnique(datasetid);
create index datasettechnique_techniqueid_index on datasettechnique(techniqueid);

create table acl (
  id                bigserial primary key,
  model             text not null,
  property          text not null,
  accesstype        text not null,
  principaltype     text not null,
  principalid       bigint not null,
  permission        text not null
);

create table "user" (
);

create table accesstoken (
);

create table role (
);

create table rolemapping (
);


