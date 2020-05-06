'use strict';

const expect = require('chai').expect;
const request = require('supertest');

let app;

before((done) => {
  app = require('../server/server');
  done();
});

describe('Instrument', () => {
  const requestUrl = '/api/Instruments';
  describe('GET /instruments', () => {
    context('without filter', () => {
      it('should return an array of instruments', (done) => {
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
              expect(document).to.have.property('name');
              expect(document).to.have.property('facility');
            });
            done();
          });
      });
    });
  });

  describe('GET /documents/{id}', () => {
    it('should return the instrument with the requested pid', (done) => {
      request(app)
        .get(
          requestUrl +
            '/' +
            encodeURIComponent(
              '20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71',
            ),
        )
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) throw err;

          expect(res.body).to.have.property('pid');
          expect(res.body['pid']).to.equal(
            '20.500.12269/0f98fcf2-7bd7-430e-ad20-d47031ca8f71',
          );
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('facility');
          done();
        });
    });
  });
});
