'use strict';

const expect = require('chai').expect;
const request = require('supertest');

let app;

before((done) => {
  app = require('../server/server');
  done();
});

describe('Dataset', () => {
  const requestUrl = '/api/Datasets';
  describe('GET /datasets', () => {
    context('without filter', () => {
      it('should return en array of all datasets', (done) => {
        request(app)
          .get(requestUrl)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) throw err;

            expect(res.body).to.be.an('array');
            res.body.forEach((dataset) => {
              expect(dataset).to.have.property('pid');
              expect(dataset).to.have.property('title');
              expect(dataset).to.have.property('isPublic');
              expect(dataset).to.have.property('creationDate');
            });
            done();
          });
      });
    });
  });
  describe('GET /Datasets/{id}', () => {
    it('should return the dataset with the requested id', (done) => {
      request(app)
        .get(
          requestUrl + '/' + encodeURIComponent('20.500.12269/panosc-dataset1'),
        )
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body).to.have.property('pid');
          expect(res.body['pid']).to.equal('20.500.12269/panosc-dataset1');
          expect(res.body).to.have.property('title');
          expect(res.body).to.have.property('isPublic');
          expect(res.body).to.have.property('creationDate');
          done();
        });
    });
  });
});
