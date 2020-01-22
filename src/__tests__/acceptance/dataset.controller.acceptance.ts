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

  it('exposes a default home page', async () => {
    await client
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/);
  });
});
