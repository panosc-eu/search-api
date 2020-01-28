import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Parameter} from './parameter.model';
import {Sample} from './sample.model';
import {Instrument} from './instrument.model';
import {Document} from './document.model';
import {Technique} from './technique.model';
import {File} from './file.model';

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
  size: number;

  @property({
    type: 'date',
    description: 'date and time dataset was created',
    required: true,
  })
  creationDate: string;

  // Define well-known properties here

  @hasMany(() => Parameter)
  parameters?: Parameter[];

  @hasOne(() => Sample)
  sample?: Sample;

  @hasOne(() => Document)
  document?: Document;

  @hasOne(() => Instrument)
  instrument?: Instrument;

  @hasOne(() => Technique)
  technique?: Technique;

  @hasMany(() => File)
  file?: File[];

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Dataset>) {
    super(data);
  }
}

export interface DatasetRelations {
  // describe navigational properties here
}

export type DatasetWithRelations = Dataset & DatasetRelations;
