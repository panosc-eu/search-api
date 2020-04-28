import {Filter} from '@loopback/repository';
import {
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
} from '@loopback/rest';
import {Document} from '../models';
import {inject} from '@loopback/context';
import {PanService} from '../services';
import {PanDocument} from '../pan-interfaces';
import {convertDocumentToPaN, convertQueryForSciCat} from '../utils';
import {SciCatPublishedData} from '../scicat-interfaces';

export class DocumentController {
  constructor(
    @inject('services.PanService')
    protected panService: PanService,
  ) {}

  @get('/documents/{pid}', {
    responses: {
      '200': {
        description: 'Document model instance',
        content: {'application/json': {schema: getModelSchemaRef(Document)}},
      },
    },
  })
  async findById(@param.path.string('pid') pid: string): Promise<Document> {
    const config = process.env.PAN_PROTOCOL ?? 'scicat';
    let pidQuery = '';
    if (config === 'scicat') {
      pidQuery = pid;
    } else if (config === 'local') {
      // search locally
    }

    return this.getDocumentById(pidQuery);
  }

  @get('/documents', {
    responses: {
      '200': {
        description: 'Array of Document model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Document)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Document))
    filter?: Filter<Document>,
  ): Promise<Document[]> {
    const config = process.env.PAN_PROTOCOL ?? 'scicat';
    let fullQuery = '';
    if (config === 'scicat') {
      fullQuery = convertQueryForSciCat(filter);
    } else if (config === 'local') {
      // search locally
    }

    return this.callPanService(fullQuery);
  }

  async getDocumentById(pid: string): Promise<Document> {
    return this.panService
      .getDocuments(JSON.stringify({where: {doi: pid}}))
      .then(res =>
        res
          .map((element: SciCatPublishedData) => convertDocumentToPaN(element))
          .find((element: Document) => element.pid === pid),
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async callPanService(text: string): Promise<any> {
    return this.panService.getDocuments(text).then(res => {
      // console.log('====== \n result:', res);
      const array: PanDocument[] = [];
      res.forEach((element: SciCatPublishedData) => {
        array.push(convertDocumentToPaN(element));
      });
      return array;
    });
  }

  // jklfvdjfs
}
