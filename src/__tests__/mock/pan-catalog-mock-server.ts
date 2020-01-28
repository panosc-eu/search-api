import * as express from 'express';
import PanCatalogReponseCreator from './pan-catalog-response-creator';
import {lifeCycleObserver} from '@loopback/core';

@lifeCycleObserver('server')
export class PanCatalogMockServer {
  private _server = null;
  private _port = 3002;
  private _defaultInstance = 'default-instance';
  private _error = {state: false, type: null};
  private _createdDeployments = new Map();
  private _createdServices = new Map();
  private _createdNamespaces = new Map();

  start() {
    if (this._server != null) {
      return;
    }

    const app = express();
    const panCatalogResponseCreator = new PanCatalogReponseCreator();

    app.get('/app/v1/datasets/:pid', (req, res) => {
      const response = panCatalogResponseCreator.getDataset();
      if (response != null) {
        res.status(200).send(response);
      } else {
        res.sendStatus(404);
      }
    });
  }
}
