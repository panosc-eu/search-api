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
  let aDataset: Dataset;
  let aDatasetWithPid: Dataset;

  beforeEach(resetRepositories);

  let find: sinon.SinonStub;
  let findById: sinon.SinonStub;
  let create: sinon.SinonStub;
  let replaceById: sinon.SinonStub;
  let updateById: sinon.SinonStub;
  let deleteById: sinon.SinonStub;

  describe('findDatasets', () => {
    it('creates a dataset', async () => {
      create.resolves(aDatasetWithPid);
      const result = await controller.create(aDataset);
      expect(result).to.eql(aDatasetWithPid);
      sinon.assert.calledWith(create, aDataset);
    });

    it('retrieves datasets if they exist', async () => {
      find.resolves(aListOfDatasets);

      const details = await controller.find();

      expect(details).to.eql(aListOfDatasets);

      sinon.assert.called(find);
    });
  });

  function resetRepositories() {
    datasetRepo = createStubInstance(DatasetRepository);
    aDataset = givenDataset();
    aDatasetWithPid = givenDataset({pid: 'string'});
    aListOfDatasets = [
      givenDataset({
        pid: 'string',
        name: 'string',
        size: 3,
        isPublic: true,
        creationDate: '2019-01-01T23:01Z',
      }),
    ] as Dataset[];

    ({create, find, findById, replaceById, deleteById} = datasetRepo.stubs);
    controller = new DatasetController(datasetRepo);
  }
});
