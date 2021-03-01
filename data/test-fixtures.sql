set schema 'search_api';

INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71', 'LoKI', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/d4ae7284-6659-4403-a192-1c037b9bffc0', 'DREAM', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/dc746e84-b529-4731-afa6-132ae58d7ee1', 'MAGiC', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/d3dd2880-637a-40b5-9815-990453817f0e', 'HEIMDAL', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/f961edb4-b801-46a9-9d6c-180e27b0ccc1', 'NMX', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/2a120f90-f1fe-4069-90a2-8b1c32bf760a', 'BEER', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/125e8172-d0f4-4547-98be-a9db903a6269', 'ODIN', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/07297dd4-557f-4ef6-974f-5c1eec610b9e', 'ESTIA', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/f0637030-9f89-4398-8f01-09211145efa1', 'FREIA', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/f8da8176-28d8-4226-848e-8fd53fda86ef', 'SKADI', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/a8d44b33-5df1-4a01-a910-832d62051e2f', 'BIFROST', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/f1959863-6c2e-494d-a2b5-5e6385acb248', 'CSPEC', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/b24264c5-c37f-40f7-b2ec-c24c3077f714', 'MIRACLES', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/da7552ea-a2db-49e7-9e22-1c3a2e1cf309', 'T-REX', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('20.500.12269/2a946970-21c5-45cc-b921-b2b020db3ae0', 'VESPA', 'ESS', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('10.5291-ILL-INSTRUMENT.1', 'd11', 'ILL', null);
INSERT INTO instrument (pid, name, facility, score)
VALUES ('10.5291-ILL-INSTRUMENT.2', 'd22', 'ILL', null);

INSERT INTO document (pid, ispublic, type, title, summary, doi, startdate, enddate, releasedate, license, keywords, score)
VALUES ('10.5072/panosc-document1', true, 'publication', 'PaNOSC Test Publication', 'A PaNOSC publication showing how things are done', '10.5072/a.pub.doi', '2021-02-10', '2021-02-26', '2021-02-27', 'CC-BY', '{neutron,panosc}', null);
INSERT INTO document (pid, ispublic, type, title, summary, doi, startdate, enddate, releasedate, license, keywords, score)
VALUES ('10.5072/panosc-document2', true, 'proposal', 'PaNOSC Test Proposal', 'A proposal used to get data', '10.5072/a.prop.doi', '2020-02-10', '2020-02-26', '2020-02-27', 'CC-BY', '{neutron,panosc,good}', null);
INSERT INTO document (pid, ispublic, type, title, summary, doi, startdate, enddate, releasedate, license, keywords, score)
VALUES ('10.5291/panosc-document3', true, 'publication', 'Another PaNOSC Test Publication', 'A PaNOSC publication showing how things are done properly', '10.5291/a.good.ol.pub.doi', '2021-02-10', '2021-02-26', '2021-02-27', 'CC-BY', '{neutron,panosc,nobel}', null);
INSERT INTO document (pid, ispublic, type, title, summary, doi, startdate, enddate, releasedate, license, keywords, score)
VALUES ('10.5291/panosc-document4', true, 'proposal', 'Another PaNOSC Test Proposal', 'A proposal used to get good data', '10.5291/a.good.ol.prop.doi', '2020-02-10', '2020-02-26', '2020-02-27', 'CC-BY', '{neutron,panosc,excellent}', null);

INSERT INTO person (id, firstname, lastname, fullname)
VALUES ('panosc-person1', 'John', 'Smith', 'John Smith');
INSERT INTO person (id, firstname, lastname, fullname)
VALUES ('panosc-person2', 'James', 'Chadwick', 'James Chadwick');

INSERT INTO affiliation (id, name, address, city, country)
VALUES (1, 'ESS', 'Odarslövsvägen 113', 'Lund', 'Sweden');
INSERT INTO affiliation (id, name, address, city, country)
VALUES (2, 'ILL', '71 avenue des Martyrs', 'Grenoble', 'France');

INSERT INTO member (id, role, documentid, personid, affiliationid)
VALUES (1, 'principal investigator', '10.5072/panosc-document1', 'panosc-person1', 1);
INSERT INTO member (id, role, documentid, personid, affiliationid)
VALUES (2, 'owner', '10.5072/panosc-document1', 'panosc-person2', 1);
INSERT INTO member (id, role, documentid, personid, affiliationid)
VALUES (3, 'principal investigator', '10.5072/panosc-document2', 'panosc-person2', 1);
INSERT INTO member (id, role, documentid, personid, affiliationid)
VALUES (4, 'owner', '10.5072/panosc-document2', 'panosc-person1', 1);

INSERT INTO dataset (pid, title, ispublic, size, creationdate, documentid, instrumentid)
VALUES ('20.500.12269/panosc-dataset1', 'PaNOSC Test Dataset 1', true, 32324.5, '2020-05-05T15:01:02.341Z', '10.5072/panosc-document1', '20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71');
INSERT INTO dataset (pid, title, ispublic, size, creationdate, documentid, instrumentid)
VALUES ('20.500.12269/panosc-dataset2', 'PaNOSC Test Dataset 2', true, 1235253, '2020-05-05T15:01:02.341Z', '10.5072/panosc-document1', '20.500.12269/125e8172-d0f4-4547-98be-a9db903a6269');
INSERT INTO dataset (pid, title, ispublic, size, creationdate, documentid, instrumentid)
VALUES ('20.500.12269/panosc-dataset3', 'PaNOSC Test Dataset 3', true, 53453.1, '2020-05-05T15:01:02.341Z', '10.5072/panosc-document2', '20.500.12269/f0637030-9f89-4398-8f01-09211145efa1');
INSERT INTO dataset (pid, title, ispublic, size, creationdate, documentid, instrumentid)
VALUES ('20.500.12269/panosc-dataset4', 'PaNOSC Test Dataset 4', true, 5436017, '2020-05-05T15:01:02.341Z', '10.5072/panosc-document2', '20.500.12269/d3dd2880-637a-40b5-9815-990453817f0e');

INSERT INTO file (id, name, path, size, datasetid)
VALUES (1, 'panosc-file1.hdf', '/data', 32, '20.500.12269/panosc-dataset1');
INSERT INTO file (id, name, path, size, datasetid)
VALUES (2, 'panosc-file2.hdf', '/data', 54, '20.500.12269/panosc-dataset2');
INSERT INTO file (id, name, path, size, datasetid)
VALUES (3, 'panosc-file3.hdf', '/data', 654, '20.500.12269/panosc-dataset3');
INSERT INTO file (id, name, path, size, datasetid)
VALUES (4, 'panosc-file4.hdf', '/data', 234, '20.500.12269/panosc-dataset4');

INSERT INTO parameter (id, name, value, unit, datasetid)
VALUES (1, 'chemical_formula', 'Cu', null, '20.500.12269/panosc-dataset1');
INSERT INTO parameter (id, name, value, unit, datasetid)
VALUES (2, 'sample_state', 'solid', null, '20.500.12269/panosc-dataset1');
INSERT INTO parameter (id, name, value, unit, datasetid)
VALUES (3, 'photon_energy', '930', 'eV', '20.500.12269/panosc-dataset2');
INSERT INTO parameter (id, name, value, unit, datasetid)
VALUES (4, 'temperature', '20', 'celsius', '20.500.12269/panosc-dataset3');
INSERT INTO parameter (id, name, value, unit, datasetid)
VALUES (5, 'wavelength', '1064', 'nm', '20.500.12269/panosc-dataset4');
INSERT INTO parameter (id, name, value, unit, documentid)
VALUES (6, 'wavelength', '1064', 'nm', '10.5072/panosc-document1');

INSERT INTO sample (pid, name)
VALUES ('20.500.12269/panosc-sample1', 'solid copper cylinder');

INSERT INTO technique (pid, name)
VALUES ('20.500.12269/panosc-tech1', 'small-angle neutron scattering');
INSERT INTO technique (pid, name)
VALUES ('20.500.12269/panosc-tech2', 'x-ray absorption');

INSERT INTO datasetsample (id, datasetid, sampleid)
VALUES (1, '20.500.12269/panosc-dataset1', '20.500.12269/panosc-sample1');
INSERT INTO datasetsample (id, datasetid, sampleid)
VALUES (2, '20.500.12269/panosc-dataset2', '20.500.12269/panosc-sample1');
INSERT INTO datasetsample (id, datasetid, sampleid)
VALUES (3, '20.500.12269/panosc-dataset3', '20.500.12269/panosc-sample1');
INSERT INTO datasetsample (id, datasetid, sampleid)
VALUES (4, '20.500.12269/panosc-dataset4', '20.500.12269/panosc-sample1');

INSERT INTO datasettechnique (id, datasetid, techniqueid)
VALUES (1, '20.500.12269/panosc-dataset1', '20.500.12269/panosc-tech1');
INSERT INTO datasettechnique (id, datasetid, techniqueid)
VALUES (2, '20.500.12269/panosc-dataset2', '20.500.12269/panosc-tech1');
INSERT INTO datasettechnique (id, datasetid, techniqueid)
VALUES (3, '20.500.12269/panosc-dataset3', '20.500.12269/panosc-tech2');
INSERT INTO datasettechnique (id, datasetid, techniqueid)
VALUES (4, '20.500.12269/panosc-dataset4', '20.500.12269/panosc-tech2');

