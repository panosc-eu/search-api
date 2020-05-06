import { Filter } from '@loopback/repository';
import { Document } from '../models';
import { DocumentRepository } from '../repositories';
export declare class DocumentController {
    protected documentRepository: DocumentRepository;
    constructor(documentRepository: DocumentRepository);
    findById(pid: string): Promise<Document>;
    find(filter?: Filter<Document>): Promise<Document[]>;
}
