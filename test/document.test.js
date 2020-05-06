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
