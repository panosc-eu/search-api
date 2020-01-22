import {DatasetController} from '../../controllers';
import {ScicatService, ScicatProvider} from '../../services';
import {expect, sinon} from '@loopback/testlab';
import {ScicatDataSource} from '../../datasources';

describe('DatasetController (integration)', () => {
  beforeEach(givenMockScicatService);
  let scicatMockService: ScicatService;

  describe('getDetails()', () => {
    it('retrieves details of the given product', async () => {
      const controller = new DatasetController(scicatMockService);

      const details = await controller.getDetails('nmx', {limit: 1});
      const expectedValue = [
        {
          doi: '03dd9804-1b04-4d36-b0fb-cf66e9891e7d',
          affiliation: 'ESS',
          creator: ['Oliver Lohmann'],
          publisher: 'ESS',
          publicationYear: 2019,
          title: 'SANS/Reflectometry',
          url: '',
          abstract: 'SANS/Reflectometry',
          dataDescription: 'V20 data',
          thumbnail: '',
          resourceType: 'NeXus HDF5',
          numberOfFiles: null,
          sizeOfArchive: null,
          pidArray: ['20.500.12269/0a269002-83e2-4f18-bb98-36c01836d66a'],
          authors: ['Oliver Lohmann'],
        },
      ];
      expect(details).to.be.an.Array();
    });
  });

  async function givenMockScicatService() {
    const scicatMockDataSource = await givenAConnectedDataSource();
    scicatMockService = await new ScicatProvider(scicatMockDataSource).value();
  }

  async function givenAConnectedDataSource(): Promise<ScicatDataSource> {
    const scicatDataSource = new ScicatDataSource();
    await scicatDataSource.connect();
    return scicatDataSource;
  }
});
