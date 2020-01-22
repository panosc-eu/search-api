import {DatasetController} from '../../controllers';
import {ScicatService, ScicatProvider} from '../../services';
import {expect} from '@loopback/testlab';
import {ScicatDataSource} from '../../datasources';

describe('DatasetController (integration)', () => {
  beforeEach(givenMockScicatService);
  let scicatMockService: ScicatService;

  describe('getDetails()', () => {
    it('returns array of results', async () => {
      const controller = new DatasetController(scicatMockService);
      const details = await controller.getDetails({limit: 1});
      expect(details).to.be.an.Array();
    });

    it('query for multiple units', async () => {
      const controller = new DatasetController(scicatMockService);
      const details = await controller.getDetails({
        where: {
          and: [
            {
              variable: 'temperature',
              operator: 'gt',
              value: 0,
              unit: 'degC',
            },
            {
              variable: 'pressure',
              operator: 'gt',
              value: 7000000,
              unit: 'bar',
            },
          ],
        },
        skip: 0,
        limit: 1,
      });
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
