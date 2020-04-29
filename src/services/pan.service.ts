import {
  inject,
  Provider,
  BindingTemplate,
  extensionFor,
  BindingScope,
  BindingFilter,
  extensionFilter,
} from '@loopback/core';

export interface PanService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDetails(title: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDocuments(title: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getInstruments(title: string): Promise<any>;
}

export const PAN_SERVICE = 'PanService';

/**
 * A binding template for recommender service extensions
 */
export function pan(protocol: string) {
  const asPanService: BindingTemplate = binding => {
    extensionFor(PAN_SERVICE)(binding);
    binding.tag({protocol}).inScope(BindingScope.SINGLETON);
  };
  return asPanService;
}

const panFilter: BindingFilter = binding => {
  const protocol = process.env.PAN_PROTOCOL ?? 'scicat';
  return (
    extensionFilter(PAN_SERVICE)(binding) &&
    binding.tagMap.protocol === protocol
  );
};

export class PanServiceProvider implements Provider<PanService> {
  constructor(
    // scicat must match the name property in the datasource json file
    @inject(panFilter)
    private panServices: PanService[],
  ) {}

  value() {
    return this.panServices[0];
  }
}
