import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Dataset, DatasetWithRelations} from './dataset.model';

@model({settings: {strict: false}})
export class File extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    generated: false,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  path?: string;

  @property({
    type: 'number',
  })
  size?: number;

  @belongsTo(() => Dataset)
  datasetId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<File>) {
    super(data);
  }
}

export interface FileRelations {
  // describe navigational properties here
  dataset?: DatasetWithRelations;
}

export type FileWithRelations = File & FileRelations;
