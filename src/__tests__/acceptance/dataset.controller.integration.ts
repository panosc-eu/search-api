import {DatasetController} from '../../controllers';
import {PanService, PanProvider} from '../../services';
import {expect} from '@loopback/testlab';
import {ScicatDataSource} from '../../datasources';

describe('DatasetController (integration)', () => {
  beforeEach(givenMockScicatService);
  let scicatMockService: PanService;

  describe('getDetails()', () => {
    it('returns array of results', async () => {
      const controller = new DatasetController(scicatMockService);
      const details = await controller.getDetails({limit: 1});
      expect(details).to.be.an.Array();
    });

    it('queries for multiple units', async () => {
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
              variable: 'sample_pressure',
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

    it('queries for  units', async () => {
      const controller = new DatasetController(scicatMockService);
      const details = await controller.getDetails({
        where: {
          query: {
            variable: 'sample_temperature',
            operator: 'gt',
            value: 0,
            unit: 'degC',
          },
          skip: 0,
          limit: 1,
        },
      });
      expect(details).to.be.an.Array();
    });
  });

  async function givenMockScicatService() {
    const scicatMockDataSource = await givenAConnectedDataSource();
    scicatMockService = await new PanProvider(scicatMockDataSource).value();
  }

  async function givenAConnectedDataSource(): Promise<ScicatDataSource> {
    const scicatDataSource = new ScicatDataSource();
    await scicatDataSource.connect();
    return scicatDataSource;
  }
});
