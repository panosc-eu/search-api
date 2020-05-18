'use strict';

const expect = require('chai').expect;
const request = require('supertest');

let app;

before((done) => {
  app = require('../server/server');
  done();
});

describe('Document', () => {
  const requestUrl = '/api/Documents';
  describe('GET /documents', () => {
    context('without filter', () => {
      it('should return an array of documents', (done) => {
        request(app)
          .get(requestUrl)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) throw err;

            expect(res.body).to.be.an('array');
            res.body.forEach((document) => {
              expect(document).to.have.property('pid');
              expect(document).to.have.property('isPublic');
              expect(document).to.have.property('type');
              expect(document).to.have.property('title');
            });
            done();
          });
      });
    });

    context(
      'where type is proposal and the principal investigator is a specific person',
      () => {
        it('should return an array of documents matching the type and the person', (done) => {
          const filter = JSON.stringify({
            where: {
              type: 'proposal',
            },
            include: [
              {
                relation: 'datasets',
              },
              {
                relation: 'members',
                scope: {
                  where: {
                    role: 'principal investigator',
                  },
                  include: [
                    {
                      relation: 'person',
                      scope: {
                        where: {
                          fullName: 'James Chadwick',
                        },
                      },
                    },
                  ],
                },
              },
            ],
          });
          request(app)
            .get(requestUrl + '?filter=' + filter)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) throw err;

              expect(res.body).to.be.an('array');
              res.body.forEach((document) => {
                expect(document).to.have.property('pid');
                expect(document).to.have.property('isPublic');
                expect(document).to.have.property('type');
                expect(document).to.have.property('title');
                expect(document).to.have.property('datasets');
                expect(document.datasets).to.be.an('array').and.not.empty;
                expect(document).to.have.property('members');
                expect(document.members).to.be.an('array').and.not.empty;
                document.members.forEach((member) => {
                  expect(member.role).to.equal('principal investigator');
                  expect(member.person.fullName).to.equal('James Chadwick');
                });
              });
              done();
            });
        });
      },
    );

    context(
      'where parameters has a wavelength in the range 1000-1100 nm',
      () => {
        it('should return an array of documents matching the parameter', (done) => {
          const filter = JSON.stringify({
            include: [
              {
                relation: 'parameters',
                scope: {
                  where: {
                    and: [
                      {
                        name: 'wavelength',
                      },
                      {
                        value: {
                          between: [1000, 1100],
                        },
                      },
                      {
                        unit: 'nm',
                      },
                    ],
                  },
                },
              },
            ],
          });
          request(app)
            .get(requestUrl + '?filter=' + filter)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) throw err;

              expect(res.body).to.be.an('array');
              res.body.forEach((document) => {
                expect(document).to.have.property('pid');
                expect(document).to.have.property('isPublic');
                expect(document).to.have.property('type');
                expect(document).to.have.property('title');
                expect(document).to.have.property('parameters');
                expect(document.parameters).to.be.an('array').and.not.empty;
                document.parameters.forEach((parameter) => {
                  expect(parameter.name).to.equal('wavelength');
                  expect(parameter.value).to.be.within(1000, 1100);
                  expect(parameter.unit).to.equal('nm');
                });
              });
              done();
            });
        });
      },
    );

    context(
      'where dataset parameters has a wavelength in the range 1000-1100 nm',
      () => {
        it('should return an array of documents with datasets matching the parameter', (done) => {
          const filter = JSON.stringify({
            include: [
              {
                relation: 'datasets',
                scope: {
                  include: [
                    {
                      relation: 'parameters',
                      scope: {
                        where: {
                          and: [
                            {
                              name: 'wavelength',
                            },
                            {
                              value: {
                                between: [1000, 1100],
                              },
                            },
                            {
                              unit: 'nm',
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            ],
          });
          request(app)
            .get(requestUrl + '?filter=' + filter)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) throw err;

              expect(res.body).to.be.an('array');
              res.body.forEach((document) => {
                expect(document).to.have.property('pid');
                expect(document).to.have.property('isPublic');
                expect(document).to.have.property('type');
                expect(document).to.have.property('title');
                expect(document).to.have.property('datasets');
                expect(document.datasets).to.be.an('array').and.not.empty;
                document.datasets.forEach((dataset) => {
                  expect(dataset).to.have.property('parameters');
                  expect(dataset.parameters).to.be.an('array').and.not.empty;
                  dataset.parameters.forEach((parameter) => {
                    expect(parameter.name).to.equal('wavelength');
                    expect(parameter.value).to.be.within(1000, 1100);
                    expect(parameter.unit).to.equal('nm');
                  });
                });
              });
              done();
            });
        });
      },
    );

    context(
      'where datasets are using technique x-ray absorption and sample is solid copper cylinder',
      () => {
        it('should return an array of documents with datasets using the technique and sample', (done) => {
          const filter = JSON.stringify({
            include: [
              {
                relation: 'datasets',
                scope: {
                  include: [
                    {
                      relation: 'samples',
                      scope: {
                        where: {
                          name: 'solid copper cylinder',
                        },
                      },
                    },
                    {
                      relation: 'techniques',
                      scope: {
                        where: {
                          name: 'x-ray absorption',
                        },
                      },
                    },
                  ],
                },
              },
            ],
          });
          request(app)
            .get(requestUrl + '?filter=' + filter)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) throw err;

              expect(res.body).to.be.an('array');
              res.body.forEach((document) => {
                expect(document).to.have.property('pid');
                expect(document).to.have.property('isPublic');
                expect(document).to.have.property('type');
                expect(document).to.have.property('title');
                expect(document).to.have.property('datasets');
                expect(document.datasets).to.be.an('array').and.not.empty;
                document.datasets.forEach((dataset) => {
                  expect(dataset).to.have.property('samples');
                  expect(dataset.samples).to.be.an('array').and.not.empty;
                  dataset.samples.forEach((sample) => {
                    expect(sample.name).to.equal('solid copper cylinder');
                  });
                  expect(dataset).to.have.property('techniques');
                  expect(dataset.techniques).to.be.an('array').and.not.empty;
                  dataset.techniques.forEach((technique) => {
                    expect(technique.name).to.equal('x-ray absorption');
                  });
                });
              });
              done();
            });
        });
      },
    );

    context('where datasets have a file matching text `file1`', () => {
      it('should return an array of documents with datasets and files matching the query', (done) => {
        const filter = JSON.stringify({
          include: [
            {
              relation: 'datasets',
              scope: {
                include: [{relation: 'files', scope: {where: {text: 'file1'}}}],
              },
            },
          ],
        });
        request(app)
          .get(requestUrl + '?filter=' + filter)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) throw err;

            expect(res.body).to.be.an('array');
            res.body.forEach((document) => {
              expect(document).to.have.property('pid');
              expect(document).to.have.property('isPublic');
              expect(document).to.have.property('type');
              expect(document).to.have.property('title');
              expect(document).to.have.property('datasets');
              expect(document.datasets).to.be.an('array').and.not.empty;
              document.datasets.forEach((dataset) => {
                expect(dataset).to.have.property('files');
                expect(dataset.files).to.be.an('array').and.not.empty;
                dataset.files.forEach((file) => {
                  expect(file.name).to.include('file1');
                });
              });
            });
            done();
          });
      });
    });
  });

  describe('GET /documents/{id}', () => {
    it('should return the document with the requested pid', (done) => {
      request(app)
        .get(requestUrl + '/' + encodeURIComponent('10.5072/panosc-document1'))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body).to.have.property('pid');
          expect(res.body['pid']).to.equal('10.5072/panosc-document1');
          expect(res.body).to.have.property('isPublic');
          expect(res.body).to.have.property('type');
          expect(res.body).to.have.property('title');
          done();
        });
    });
  });
});
