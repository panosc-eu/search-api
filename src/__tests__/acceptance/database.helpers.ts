import {DatasetRepository} from '../../repositories';
import {testdb} from '../fixtures/test.datasource';

export async function givenEmptyDatabase() {
  await new DatasetRepository(testdb).deleteAll();
}
