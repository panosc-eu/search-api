import {Entity, model, property, hasMany} from '@loopback/repository';
import {
  DatasetSample,
  DatasetSampleWithRelations,
} from './dataset-sample.model';

@model({settings: {strict: false}})
export class Sample extends Entity {
  @property({
    type: 'string',
    description: 'Name of sample',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    description: 'Persistent identifier of sample',
    generated: false,
  })
  pid?: string;

  @property({
    type: 'string',
    description: 'description of sample',
  })
  description?: string;

  @hasMany(() => DatasetSample)
  datasetSamples?: DatasetSample[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Sample>) {
    super(data);
  }
}

export interface SampleRelations {
  // describe navigational properties here
  datasetSamples?: DatasetSampleWithRelations[];
}

export type SampleWithRelations = Sample & SampleRelations;
