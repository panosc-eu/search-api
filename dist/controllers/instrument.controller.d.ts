import { Filter } from '@loopback/repository';
import { Instrument } from '../models';
import { InstrumentRepository } from '../repositories';
export declare class InstrumentController {
    protected instrumentRepository: InstrumentRepository;
    constructor(instrumentRepository: InstrumentRepository);
    findById(pid: string): Promise<Instrument>;
    find(filter?: Filter<Instrument>): Promise<Instrument[]>;
}
