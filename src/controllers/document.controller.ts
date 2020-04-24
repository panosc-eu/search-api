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
import {convertDocumentToPaN, convertDocumentQueryForSciCat} from '../utils';
import {SciCatPublishedData} from '../scicat-interfaces';

export class DocumentController {
  constructor(
    @inject('services.PanService')
    protected panService: PanService,
  ) {}

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
      fullQuery = convertDocumentQueryForSciCat(filter);
    } else if (config === 'local') {
      // search locally
    }

    console.log('>>>>>>> document query', fullQuery);
    return this.getDocuments(fullQuery);
  }

  @get('/documents/{id}', {
    responses: {
      '200': {
        description: 'Document model instance',
        content: {'application/json': {schema: getModelSchemaRef(Document)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Document> {
    const config = process.env.PAN_PROTOCOL ?? 'scicat';
    let idQuery = '';
    if (config === 'scicat') {
      idQuery = encodeURIComponent(id);
    } else if (config === 'local') {
      // search locally
    }

    return this.getDocumentsById(idQuery);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getDocuments(text: string): Promise<any> {
    return this.panService.getDocuments(text).then(res => {
      // console.log('====== \n result:', res);
      return res.map((element: SciCatPublishedData) =>
        convertDocumentToPaN(element),
      );
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getDocumentsById(id: string): Promise<any> {
    return this.panService
      .getDocumentsById(id)
      .then(res => convertDocumentToPaN(res));
  }
}
