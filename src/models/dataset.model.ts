import {
  Entity,
  model,
  property,
  hasMany,
  belongsTo,
} from '@loopback/repository';
import {Parameter, ParameterWithRelations} from './parameter.model';
import {Instrument, InstrumentWithRelations} from './instrument.model';
import {Document, DocumentWithRelations} from './document.model';
import {File, FileWithRelations} from './file.model';
import {
  DatasetTechnique,
  DatasetTechniqueWithRelations,
} from './dataset-technique.model';
import {
  DatasetSample,
  DatasetSampleWithRelations,
} from './dataset-sample.model';

@model({
  settings: {
    strict: false,
    description:
      'information about an experimental run, including optional File,\
       Sample, Instrument and Technique',
  },
})
export class Dataset extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
    description: 'persistent identifier for dataset',
    generated: false,
  })
  pid: string;

  @property({
    type: 'string',
    description: 'dataset title',
    required: true,
  })
  title: string;

  @property({
    type: 'boolean',
    description: 'condition if publically accessible',
    required: true,
  })
  isPublic: boolean;

  @property({
    type: 'number',
    description: 'size in bytes of dataset',
    required: true,
  })
  size?: number;

  @property({
    type: 'date',
    description: 'date and time dataset was created',
    required: true,
  })
  creationDate?: string;

  @property({
    type: 'number',
    description: 'score of how well dataset is mathing the query',
  })
  score?: number;

  // Define well-known properties here

  @hasMany(() => Parameter)
  parameters?: Parameter[];

  @hasMany(() => DatasetSample)
  datasetSamples?: DatasetSample[];

  @belongsTo(() => Document)
  documentId?: string;

  @belongsTo(() => Instrument)
  instrumentId?: Instrument;

  @hasMany(() => DatasetTechnique)
  datasetTechniques?: DatasetTechnique[];

  @hasMany(() => File)
  files?: File[];

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Dataset>) {
    super(data);
  }
}

export interface DatasetRelations {
  // describe navigational properties here
  parameters?: ParameterWithRelations[];
  datasetSamples?: DatasetSampleWithRelations[];
  document?: DocumentWithRelations;
  instrument?: InstrumentWithRelations;
  datasetTechniques?: DatasetTechniqueWithRelations[];
  files?: FileWithRelations[];
}

export type DatasetWithRelations = Dataset & DatasetRelations;
