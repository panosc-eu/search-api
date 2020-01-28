import express from 'express';
import PanCatalogReponseCreator from './pan-catalog-response-creator';
import {lifeCycleObserver} from '@loopback/core';
import {Server} from 'http';

@lifeCycleObserver('server')
export class PanCatalogMockServer {
  private _server: Server | null = null;
  private _port = 3002;

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

    this._server = app.listen(this._port, () => {
      console.log('server listing on port ', this._port);
    });
  }

  stop() {
    if (this._server != null) {
      this._server.close();
      this._server = null;
      console.log('Stopped mock catalog');
    }
  }
}
