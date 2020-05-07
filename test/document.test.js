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
        it('should return an array of documents mathing the type and the person', (done) => {
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
                expect(document.type).to.equal('proposal');
                expect(document).to.have.property('title');
                expect(document).to.have.property('datasets');
                expect(document.datasets).to.be.an('array').and.not.empty;
                expect(document).to.have.property('members');
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
