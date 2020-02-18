import {Client} from '@loopback/testlab';
import {CommonApiApplication} from '../..';
import {setupApplication} from './test-helper';

describe('dataset', () => {
  let app: CommonApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('exposes datasets endpoint with json type', async () => {
    await client.get('/datasets').expect(200);
  });
});
