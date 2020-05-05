import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Dataset, DatasetWithRelations} from './dataset.model';
import {Technique, TechniqueWithRelations} from './technique.model';

@model({settings: {strict: false}})
export class DatasetTechnique extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
    generated: false,
  })
  id: number;

  @belongsTo(() => Dataset)
  datasetId: string;

  @belongsTo(() => Technique)
  techniqueId: string;

  constructor(data?: Partial<DatasetTechnique>) {
    super(data);
  }
}

export interface DatasetTechniqueRelations {
  // describe navigational properties here
  dataset?: DatasetWithRelations;
  technique?: TechniqueWithRelations;
}

export type DatasetTechniqueWithRelations = DatasetTechnique &
  DatasetTechniqueRelations;
