'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const superagent = require("superagent");



describe('PaNET', () => {
  let app;
  let sandbox
  const env = Object.assign({}, process.env);
  let getMock

  before((done) => {
    process.env.PANET_BASE_URL = "http://a-url";
    sandbox = require('sinon').createSandbox()
    delete require.cache[require.resolve("../server/server")];
    app = require('../server/server');
    getMock = sandbox.stub(superagent, "get").returns(
      { query: async () => (
        { text: "{\"pid\": {\"inq\":[\"http://purl.org/pan-science/PaNET/PaNET01227\"]}}"
      }) });
    done()
  });

  after((done) => {
    delete require.cache[require.resolve('../server/server')];
    process.env = env;
    sandbox.restore();
    done()
  });

    context('where technique is x-ray absorption from PaNET', () => {
      it('should return en array of datasets matching the technique', (done) => {
    const requestUrl = '/api/Datasets';
        const filter = JSON.stringify({
          include: [
            {
              relation: 'techniques',
              scope: {
                where: {
                  name: 'x-ray absorption',
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

            expect(getMock.calledWith(
              "http://a-url/techniques/pan-ontology")).to.be.true
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(2);
            res.body.forEach((dataset) => {
              expect(dataset).to.have.property('pid');
              expect(dataset).to.have.property('title');
              expect(dataset).to.have.property('isPublic');
              expect(dataset).to.have.property('creationDate');
              expect(dataset).to.have.property('score');
              expect(dataset).to.have.property('techniques');
              expect(dataset.techniques).to.be.an('array').and.not.empty;
              dataset.techniques.forEach((technique) => {
                expect(technique.name).to.equal('x-ray absorption');
                expect(technique.panetId).to.equal(
                  'http://purl.org/pan-science/PaNET/PaNET01227');
              });
            });
            done();
          });
      });
    });

  context(
    'where datasets are using technique x-ray absorption and sample is solid copper cylinder',
    () => {
      it('should return an array of documents with datasets using the technique and sample', (done) => {
        const requestUrl = '/api/Documents';
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
            expect(getMock.calledWith(
              "http://a-url/techniques/pan-ontology")).to.be.true
            expect(res.body).to.be.an('array');
            res.body.forEach((document) => {
              expect(document).to.have.property('pid');
              expect(document).to.have.property('isPublic');
              expect(document).to.have.property('type');
              expect(document).to.have.property('title');
              expect(document).to.have.property('score');
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
                  expect(technique.panetId).to.equal(
                    'http://purl.org/pan-science/PaNET/PaNET01227');
                });
              });
            });
            done();
          });
      });
    },
  );

});
