import {Filter, repository} from '@loopback/repository';
import {
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
} from '@loopback/rest';
import {Document} from '../models';
import {intercept} from '@loopback/context';
import {DocumentRepository} from '../repositories';
import {DiscardNonMatchInterceptor} from '../interceptors/discard-non-match.interceptor';
import {AddScoreInterceptor} from '../interceptors/add-score.interceptor';

export class DocumentController {
  constructor(
    @repository(DocumentRepository)
    protected documentRepository: DocumentRepository,
  ) {}

  @get('/documents/{pid}', {
    responses: {
      '200': {
        description: 'Document model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Document, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(@param.path.string('pid') pid: string): Promise<Document> {
    return this.documentRepository.findById(pid);
  }

  @intercept(DiscardNonMatchInterceptor.BINDING_KEY)
  @intercept(AddScoreInterceptor.BINDING_KEY)
  @get('/documents', {
    responses: {
      '200': {
        description: 'Array of Document model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Document, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Document))
    filter?: Filter<Document>,
  ): Promise<Document[]> {
    return this.documentRepository.find(filter);
  }
}
