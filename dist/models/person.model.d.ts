import { Entity } from '@loopback/repository';
import { Member, MemberWithRelations } from './member.model';
export declare class Person extends Entity {
    id: string;
    fullName: string;
    orcid?: string;
    researcherId?: string;
    firstName?: string;
    lastName?: string;
    members?: Member[];
    constructor(data?: Partial<Person>);
}
export interface PersonRelations {
    members?: MemberWithRelations[];
}
export declare type PersonWithRelations = Person & PersonRelations;
