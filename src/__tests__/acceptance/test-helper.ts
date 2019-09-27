import {CommonApiApplication} from '../..';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';
import {Dataset} from '../../models';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new CommonApiApplication({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: CommonApiApplication;
  client: Client;
}

export function givenDataset(dataset?: Partial<Dataset>) {
  const data = Object.assign(
    {
      pid: '10.10572',
      name: 'Small-angle scattering of pressurised water',
      size: 3,
      isPublic: true,
      creationDate: '2019-09-27T06:04:21.429Z',
    },
    dataset,
  );
  return new Dataset(data);
}
