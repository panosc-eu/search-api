import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Dataset, DatasetWithRelations} from './dataset.model';
import {Sample, SampleWithRelations} from './sample.model';

@model()
export class DatasetSample extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @belongsTo(() => Dataset)
  datasetId: string;

  @belongsTo(() => Sample)
  sampleId: string;

  constructor(data?: Partial<DatasetSample>) {
    super(data);
  }
}

export interface DatasetSampleRelations {
  // describe navigational properties here
  dataset?: DatasetWithRelations;
  sample?: SampleWithRelations;
}

export type DatasetSampleWithRelations = DatasetSample & DatasetSampleRelations;
