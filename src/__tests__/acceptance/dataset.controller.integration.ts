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
