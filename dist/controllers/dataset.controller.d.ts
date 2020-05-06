import { Dataset, File } from '../models';
import { Filter } from '@loopback/repository';
import { DatasetRepository } from '../repositories';
export declare class DatasetController {
    protected datasetRepository: DatasetRepository;
    constructor(datasetRepository: DatasetRepository);
    findById(pid: string): Promise<Dataset>;
    findByIdFiles(pid: string): Promise<File[]>;
    getDatasets(filter?: Filter<Dataset>): Promise<Dataset[]>;
}
