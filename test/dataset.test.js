'use strict';

const expect = require('chai').expect;
const request = require('supertest');

let app;

before((done) => {
  app = require('../server/server');
  done();
});

describe('Dataset', () => {
  describe('GET /datasets', () => {
    const requestUrl = '/api/Datasets';
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
            done();
          });
      });
    });
  });
});
