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

    return this.getDocuments(fullQuery);
  }

  async getDocumentById(pid: string): Promise<Document> {
    return this.panService
      .getDocuments(JSON.stringify({where: {doi: pid}}))
      .then(res =>
        convertDocumentToPaN(
          res.find((document: SciCatPublishedData) => document.doi === pid),
        ),
      );
  }

  async getDocuments(query: string): Promise<Document[]> {
    return this.panService
      .getDocuments(query)
      .then(res =>
        res.map((document: SciCatPublishedData) =>
          convertDocumentToPaN(document),
        ),
      );
  }
}
