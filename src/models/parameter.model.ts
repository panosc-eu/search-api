import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Dataset, DatasetWithRelations} from './dataset.model';
import {Document, DocumentWithRelations} from './document.model';

@model({settings: {strict: false}})
export class Parameter extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
    generated: false,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    required: true,
  })
  value: number | string;

  @property({
    type: 'string',
  })
  unit?: string;

  @belongsTo(() => Dataset)
  datasetId?: string;

  @belongsTo(() => Document)
  documentId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Parameter>) {
    super(data);
  }
}

export interface ParameterRelations {
  // describe navigational properties here
  dataset?: DatasetWithRelations;
  document?: DocumentWithRelations;
}

export type ParameterWithRelations = Parameter & ParameterRelations;
