import { Entity } from '@loopback/repository';
import { Member, MemberWithRelations } from './member.model';
import { Dataset, DatasetWithRelations } from './dataset.model';
import { Parameter, ParameterWithRelations } from './parameter.model';
export declare class Document extends Entity {
    pid: string;
    type: string;
    isPublic: boolean;
    title: string;
    summary?: string;
    doi?: string;
    startDate?: string;
    endDate?: string;
    releaseDate?: string;
    license?: string;
    keywords?: string[];
    score: number;
    members?: Member[];
    datasets?: Dataset[];
    parameters?: Parameter[];
    constructor(data?: Partial<Document>);
}
export interface DocumentRelations {
    members?: MemberWithRelations[];
    datasets?: DatasetWithRelations[];
    parameters?: ParameterWithRelations[];
}
export declare type DocumentWithRelations = Document & DocumentRelations;
