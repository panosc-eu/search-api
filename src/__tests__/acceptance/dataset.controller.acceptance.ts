import {Client, expect} from '@loopback/testlab';
import {CommonApiApplication} from '../..';
import {setupApplication} from './test-helper';
import { Dataset } from '../../models';

describe('DatasetController', () => {
  let app: CommonApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes POST /datasets', async () => {
    const dataset = givenADataset();
    const res = await client
      .post('/datasets')
      .send(dataset)
      .expect(200);
    // expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });

  function givenADataset(item?: Partial<Dataset>) {
    return new Dataset(
      Object.assign(
        {
          pid: 'string5678',
          title: 'string',
          creationDate: '2019-09-26T11:20:42.008Z',
          isPublic: true,
          size: 3
        },
        item,
      ),
    );
  }

});
