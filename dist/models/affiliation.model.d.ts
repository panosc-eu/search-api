import { Entity } from '@loopback/repository';
import { Member, MemberWithRelations } from './member.model';
export declare class Affiliation extends Entity {
    id: number;
    name: string;
    address?: string;
    city?: string;
    country?: string;
    members: Member[];
    constructor(data?: Partial<Affiliation>);
}
export interface AffiliationRelations {
    members?: MemberWithRelations[];
}
export declare type AffiliationWithRelations = Affiliation & AffiliationRelations;
