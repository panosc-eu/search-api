--create schema search_api;
--set schema 'search_api';

create table instrument (
    pid       text primary key,
    name      text not null,
    facility  text,
    score     float
);

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
  score       float
);

create table person (
  id              text primary key,
  firstname       text,
  lastname        text,
  fullname        text,
  orcid           text,
  researcherid    text
);

create table affiliation (
  id            bigserial primary key,
  name          text not null,
  address       text,
  city          text,
  country       text
);

create table member (
  id              bigserial primary key,
  role            text,
  documentid      text not null constraint fk_member_document_id references document,
  personid        text not null constraint fk_member_person_id references person,
  affiliationid   bigint not null constraint fk_member_affiliation_id references affiliation
);

create table dataset (
  pid             text primary key,
  title           text not null,
  ispublic        boolean not null default false,
  size            float,
  creationdate    timestamp,
  score           float,
  documentid      text not null constraint fk_dataset_document_id references document,
  instrumentid    text not null constraint fk_dataset_instrument_id references instrument
);

create table file (
  id             bigserial primary key,
  name           text not null,
  path           text not null,
  size           float,
  datasetid      text not null constraint fk_file_dataset_id references dataset
);

create table parameter (
  id             bigserial primary key,
  name           text not null,
  value          text not null,
  unit           text,
  datasetid      text constraint fk_parameter_dataset_id references dataset,
  documentid     text constraint fk_parameter_document_id references document
);

create table sample (
  pid            text primary key,
  name           text not null,
  description    text
);

create table technique (
  pid            text primary key,
  name           text not null
);

create table datasetsample (
  id             bigserial primary key,
  datasetid      text not null constraint fk_datasetsample_dataset_id references dataset,
  sampleid       text not null constraint fk_datasetsample_sample_id references sample
);

create table datasettechnique (
  id             bigserial primary key,
  datasetid      text not null constraint fk_datasettechnique_dataset_id references dataset,
  techniqueid    text not null constraint fk_datasettechnique_technique_id references technique
);


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


