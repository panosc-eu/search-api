import {PanCatalogMockServer} from '../mock/pan-catalog-mock-server';
import {expect} from '@loopback/testlab';
import requestPromise = require('request-promise-native');

describe('dataset (unit)', () => {
  const panCatalogMockServer = new PanCatalogMockServer();
  const mockURL = 'localhost:3002';

  beforeEach('startMockServer', async () => {
    panCatalogMockServer.start();
  });

  afterEach('stopMockServer', async () => {
    panCatalogMockServer.stop();
  });

  it('gets root', async () => {
    const datasets = requestPromise.get(mockURL);
    expect(datasets).to.be.not.null();
  });
});
