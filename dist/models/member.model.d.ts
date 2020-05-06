import { Entity } from '@loopback/repository';
import { DocumentWithRelations } from './document.model';
import { PersonWithRelations } from './person.model';
import { AffiliationWithRelations } from './affiliation.model';
export declare class Member extends Entity {
    id: number;
    role: string;
    documentId: string;
    personId: string;
    affiliationId?: number;
    [prop: string]: any;
    constructor(data?: Partial<Member>);
}
export interface MemberRelations {
    document?: DocumentWithRelations;
    person?: PersonWithRelations;
    affiliation?: AffiliationWithRelations;
}
export declare type MemberWithRelations = Member & MemberRelations;
