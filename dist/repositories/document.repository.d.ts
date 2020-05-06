import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Document, DocumentRelations, Dataset, Parameter, Member } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { DatasetRepository } from './dataset.repository';
import { ParameterRepository } from './parameter.repository';
import { MemberRepository } from './member.repository';
export declare class DocumentRepository extends DefaultCrudRepository<Document, typeof Document.prototype.pid, DocumentRelations> {
    readonly members: HasManyRepositoryFactory<Member, typeof Document.prototype.pid>;
    readonly datasets: HasManyRepositoryFactory<Dataset, typeof Document.prototype.pid>;
    readonly parameters: HasManyRepositoryFactory<Parameter, typeof Document.prototype.pid>;
    constructor(dataSource: DbDataSource, getMemberRepository: Getter<MemberRepository>, getDatasetRepository: Getter<DatasetRepository>, getParameterRepository: Getter<ParameterRepository>);
}
