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

  describe('delete Dataset', () => {
    it('successfully deletes existing item', async () => {
      deleteById.resolves();
      await controller.deleteById(aDatasetWithPid.pid as string);
      sinon.assert.calledWith(deleteById, aDatasetWithPid.pid);
    });
  });

  function resetRepositories() {
    datasetRepo = createStubInstance(DatasetRepository);
    aDataset = givenDataset();
    aDatasetWithPid = givenDataset({pid: 'string'});
    aChangedDataset = givenDataset({pid: 'string', name: 'SANS on H2O'});
    aListOfDatasets = [
      givenDataset({
        pid: '10.10572',
        name: 'Small-angle scattering of pressurised water',
        size: 3,
        isPublic: true,
        creationDate: '2019-09-27T06:04:21.429Z',
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
