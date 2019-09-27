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
  let aChangedDataset: Dataset;
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

    it('finds a dataset by pid', async () => {
      findById.resolves(aDatasetWithPid);
      const result = await controller.findById(aDatasetWithPid.pid as string);
      expect(result).to.eql(aDatasetWithPid);
      sinon.assert.calledWith(findById, aDatasetWithPid.pid);
    });

    it('retrieves datasets if they exist', async () => {
      find.resolves(aListOfDatasets);
      const details = await controller.find();
      expect(details).to.eql(aListOfDatasets);
      sinon.assert.called(find);
    });

    it('retrieves datasets with water and  pressure above 100', async () => {
      find.resolves(aListOfDatasets);
      const details = await controller.find({
        where: {and: [{'pressure.value': {gt: 100}}, {sample: 'water'}]},
      });
      console.log(details);
      expect(details).to.eql(aListOfDatasets);
      sinon.assert.called(find);
    });
  });

  describe('replaceDataset', () => {
    it('successfully replaces existing item', async () => {
      replaceById.resolves();
      await controller.replaceById(
        aDatasetWithPid.pid as string,
        aChangedDataset,
      );
      sinon.assert.calledWith(
        replaceById,
        aDatasetWithPid.pid,
        aChangedDataset,
      );
    });
  });

  describe('updateDataset', () => {
    it('successfully updates existing item', async () => {
      updateById.resolves();
      await controller.updateById(
        aDatasetWithPid.pid as string,
        aChangedDataset,
      );
      sinon.assert.calledWith(updateById, aDatasetWithPid.pid, aChangedDataset);
    });
  });

  function resetRepositories() {
    datasetRepo = createStubInstance(DatasetRepository);
    aDataset = givenDataset();
    aDatasetWithPid = givenDataset({pid: 'string'});
    aChangedDataset = givenDataset({pid: 'string', name: 'update title'});
    aListOfDatasets = [
      givenDataset({
        pid: 'string',
        name: 'string',
        size: 3,
        isPublic: true,
        creationDate: '2019-01-01T23:01Z',
        pressure: {value: 110, unit: 'bar'},
        sample: 'water',
      }),
    ] as Dataset[];

    ({
      create,
      find,
      findById,
      replaceById,
      updateById,
      deleteById,
    } = datasetRepo.stubs);
    controller = new DatasetController(datasetRepo);
  }
});
