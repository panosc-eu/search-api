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
      expect(details[0]).to.have.property('pid');
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
        skip: 0,
        limit: 1,
        where: {
          query: {
            variable: 'sample_temperature',
            operator: 'gt',
            value: 0,
            unit: 'degC',
          },
        },
      });
      expect(details).to.be.an.Array();
    });

    it('queries for samples', async () => {
      const controller = new DatasetController(scicatMockService);
      const details1 = await controller.getDatasets({
        skip: 0,
        limit: 1,
        include: [{relation: 'samples', scope: {where: {id: 2}}}],
        where: {
          query: {
            variable: 'sample_temperature',
            operator: 'gt',
            value: 0,
            unit: 'degC',
          },
        },
      });
      console.log('dataset with samples', details1);
      expect(details1).to.be.an.Array();
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
