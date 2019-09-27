import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor,
} from '@loopback/testlab';
import {DatasetRepository} from '../../repositories';
import {DatasetController} from '../../controllers';
import {Dataset} from '../../models';
import {givenDataset} from './test-helper';

describe('DatasetController (unit)', () => {
  let datasetRepo: StubbedInstanceWithSinonAccessor<DatasetRepository>;
  // beforeEach(givenStubbedRepository);

  let controller: DatasetController;
  let aListOfDatasets: Dataset[];

  beforeEach(resetRepositories);

  let find: sinon.SinonStub;

  describe('findDatasets', () => {
    it('retrieves datasets if they exist', async () => {
      find.resolves(aListOfDatasets);

      const details = await controller.find();

      expect(details).to.eql(aListOfDatasets);

      sinon.assert.called(find);
    });
  });

  function resetRepositories() {
    datasetRepo = createStubInstance(DatasetRepository);
    aListOfDatasets = [
      givenDataset({
        pid: 'string',
        name: 'string',
        size: 3,
        isPublic: true,
        creationDate: '2019-01-01T23:01Z',
      }),
    ] as Dataset[];

    ({find} = datasetRepo.stubs);
    controller = new DatasetController(datasetRepo);
  }
});
