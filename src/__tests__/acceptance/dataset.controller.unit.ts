import {PanCatalogMockServer} from '../mock/pan-catalog-mock-server';
import {expect} from '@loopback/testlab';
import request from 'request-promise-native'

describe('dataset (unit)', () => {
  const panCatalogMockServer = new PanCatalogMockServer();
  const mockURL = 'http://localhost:3002';

  beforeEach('startMockServer', async () => {
    panCatalogMockServer.start();
  });

  afterEach('stopMockServer', async () => {
    panCatalogMockServer.stop();
  });

  it('gets root', async () => {
    const root = await request.get(mockURL);
    expect(root).to.be.not.null();
  });

  it('gets by id', async () => {
    const datasetById = await request.get(mockURL + '/api/v3/PublishedData/xx');
    expect(datasetById).to.be.not.null();
  });

  it('gets datasets', async () => {
    const datasets = await request.get(mockURL + '/api/v3/PublishedData');
    //console.log(datasets);
  });
});
