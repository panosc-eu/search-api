import {DatasetController} from '../../controllers';
import {PanService, ScicatServiceProvider} from '../../services';
import {expect} from '@loopback/testlab';
import {ScicatDataSource} from '../../datasources';

describe('DatasetController (integration)', () => {
  beforeEach(givenMockScicatService);
  let scicatMockService: PanService;

  describe('getDetails()', () => {
    it('returns array of results', async () => {
      const controller = new DatasetController(scicatMockService);
      const details = await controller.getDatasets({limit: 1});
      expect(details).to.be.an.Array();
    });

    it('queries for multiple units', async () => {
      const controller = new DatasetController(scicatMockService);
      const details = await controller.getDatasets({
        where: {
          and: [
            {
              variable: 'sample_temperature',
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

    it('queries for wavelength in energy units', async () => {
      const controller = new DatasetController(scicatMockService);
      const details = await controller.getDatasets({
        where: {
          and: [
            {
              variable: 'sample_temperature',
              operator: 'gt',
              value: 0,
              unit: 'degC',
            },
            {
              variable: 'wavelength',
              operator: 'lt',
              value: 1,
              unit: 'J',
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
      const details = await controller.getDatasets({
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

    it('queries for samples', async () => {
      const controller = new DatasetController(scicatMockService);
      const details = await controller.getDatasets({
        where: {
          pid: "20.500.12269/2d5af6ef-6b94-43a4-972b-4bdb4f6c95a7",
          skip: 0,
          limit: 1,
          include: "samples"
        },
      });
      expect(details).to.be.an.Array();
    });

  });

  async function givenMockScicatService() {
    const scicatMockDataSource = await givenAConnectedDataSource();
    scicatMockService = await new ScicatServiceProvider(
      scicatMockDataSource,
    ).value();
  }

  async function givenAConnectedDataSource(): Promise<ScicatDataSource> {
    const scicatDataSource = new ScicatDataSource();
    await scicatDataSource.connect();
    return scicatDataSource;
  }
});
